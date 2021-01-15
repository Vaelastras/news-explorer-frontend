import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import './app.css';

// компоненты
import Header from '../Header/Header';
import Main from '../Main/Main';
import SearchForm from '../SearchForm/SearchForm';
import Articles from '../Articles/Articles';
import Footer from '../Footer/Footer';

// попапы
import Register from '../Register/Register';
import Login from '../Login/Login';
import PopupConfirm from '../PopupConfirm/PopupConfirm';

// контекст и HOC
import CurrentUserContext from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// сервисные компоненты
import Preloader from '../Preloader/Preloader';
import NoResult from '../NoResult/NoResult';

// апи и утилиты
import * as auth from '../../utils/MainApi';
import getArticlesFromServer from '../../utils/NewsApi';
import scrollToTop from '../../utils/topScroll';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // авторизационный стейт
  const [currentUser, setCurrentUser] = useState({}); // стейт данных по юзеру

  // стейты показа компонентов в поиске статей
  const [openPreloader, setOpenPreloader] = useState(false);
  const [openNoResults, setOpenNoResults] = useState(false);

  // стейты открытия попапов
  const [openRegisterPopup, setOpenRegisterPopup] = useState(false);
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [openConfirmPopup, setOpenConfirmPopup] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);

  // показ ошибок в попапе
  const [showErrorInPopup, setShowErrorInPopup] = useState(''); // вывод ошибок регистрации в попапе
  const [searchError, setSearchError] = useState(null); // вывод ошибок поиска в noResult

  // стейты данных с сервера newsApi
  const [articles, setArticles] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [mySavedArticles, setMySavedArticles] = useState([]);

  const history = useHistory();

  React.useEffect(() => {
    setKeyword(localStorage.getItem('keyword'));
  }, [keyword]);

  // открытие бургерного меню
  function handleClickBurger() {
    setBurgerOpen(!burgerOpen);
  }
  // закрытие всех попапов
  function closeAllPopups() {
    setOpenRegisterPopup(false);
    setOpenLoginPopup(false);
    setOpenConfirmPopup(false);
  }

  // открытие окна регистрации
  function handleOpenRegisterPopup() {
    setShowErrorInPopup(null);
    setOpenRegisterPopup(true);
  }
  // открытие окна логина
  function handleOpenLoginPopup() {
    setShowErrorInPopup(null);
    setOpenLoginPopup(true);
  }
  // переключатель попапов
  function handlePopupSwitcher() {
    if (openRegisterPopup) {
      closeAllPopups();
      handleOpenLoginPopup();
    }
    if (openLoginPopup) {
      closeAllPopups();
      handleOpenRegisterPopup();
    }
  }

  useEffect(() => {
    function handleOverlayClose(e) {
      if (e.target.classList.contains('popup_active')) {
        closeAllPopups();
      }
    }

    function handleEscClose(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('click', handleOverlayClose);
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('click', handleOverlayClose);
      document.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  // регистрация нового пользователя
  // возьмем данные из инпутов и передадим методу регистрации
  // 1 если регистрация успешна - то закрываем попап регистрации
  // 2 показываем попап подтверждения
  // 3 переадресовываем пользователя в рут
  // если все плохо - то кидаем текст ошибки в стейт для отображения в попапе регистрации

  function handleRegister(email, password, name) {
    auth.createUser(email, password, name)
      .then((res) => {
        if (res) {
          closeAllPopups();
          setOpenConfirmPopup(true);
          history.push('./');
        }
      })
      .catch((err) => {
        setShowErrorInPopup(`Ошибка регистрации: ${err}`);
      });
  }

  // авторизация пользователя
  // 1 берем данные с инпутов и отдаем их в метод авторизации
  // 2 если ответа сервера нет - то кидаем ошибку в попап входа
  // 3 если ответ есть и он ок - то записываем токен в локалсторейдж
  // 4 затем с токеном вытаскиваем сохраненный контент с базы
  // 5 если контента нет - кидаем ошибку
  // 6 если контент есть - то разботаниваем его и данные пользователя с записью в локалсторейдж
  // 7 меняем стейт логина и закрываем попап авторизации с редиректом на рут

  function handleLogin(email, password) {
    auth.authorizeUser(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        if (res) {
          auth.getContent(res.token)
            .then((data) => {
              localStorage.setItem('user', JSON.stringify(data));
              setCurrentUser(data);
              setIsLoggedIn(true);
              closeAllPopups();
              history.push('./');
            })
            .catch((err) => {
              setShowErrorInPopup(err.name);
            });
        }
      })
      .catch((err) => {
        setShowErrorInPopup(err.name);
      });
  }

  function handleLogout() {
    localStorage.clear();
    setIsLoggedIn(false);
    setArticles([]);
    history.push('/');
  }

  // запрос на поиск новостей
  // создаем стейты где лежат карты и ключевое слово по которому искали
  //
  // 1. Показываем прелоудер +
  // 2. Делаем запрос на сервер с тегом
  // 3. Если ответа нет - то:
  //    - показываем компонент NoResult (setOpenNoResults)
  //    - показываем ошибку в компоненте NoResult (setSearchError)
  // 4. Если ответ есть то :
  //    - записываем в стейт список карт ([{}, {} ...])
  //    - записываем в стейт тег по которому искали ('')
  // 5. Если в стейте карт ничего не появилось: (длина массива = 0)
  //    - показываем NoResult
  // 6. В любом случае убираем прелоудер из отображения

  // TODO: тут прилетают данные от сервера: записываю в локаль то, что лежит в объекте articles
  function handleSearchNews(tag) {
    setOpenPreloader(true);
    getArticlesFromServer(tag)
      .then((data) => {
        localStorage.setItem('articles', JSON.stringify(data.articles));
        localStorage.setItem('keyword', tag);
        setArticles(data.articles);
        setKeyword(tag);
        if (data.articles.length === 0) {
          setSearchError(true);
        }
      })
      .catch((err) => {
        setOpenNoResults(true);
        setSearchError(err.message);
      })
      .finally(() => setOpenPreloader(false));
  }

  // получить сохранненные карты
  function getSavedNews() {
    auth.getAllArticles()
      .then((data) => {
        setMySavedArticles(data);
        setKeyword(data.keyword);
      })
      .catch((err) => {
        Promise.reject(new Error(`Error: ${err.message}`));
      });
  }

  // сохрынить карту

  function handleSaveNews(article, tag) {
    console.log('1', isLoggedIn);
    if (isLoggedIn) {
      console.log('2', isLoggedIn);
      auth.saveArticle(article, tag)
        .then(() => {
          getSavedNews();
        })
        .catch((err) => {
          Promise.reject(new Error(`Error: ${err.message}`));
        });
    }
  }

  // удалить сохраненную карту
  function handleDeleteSavedNews(articleId) {
    auth.deleteArticle(articleId)
      .then(() => {
        const newMySavedArticlesArray = mySavedArticles.filter((i) => (i._id !== articleId._id));
        setMySavedArticles(newMySavedArticlesArray);
      })
      .catch((err) => {
        Promise.reject(new Error(`Error: ${err.message}`));
      });
  }

  // определяем какая статья, и либо ее сохраняем, либо удаляем
  function updateMySavedArticles(article, tag, myArticle) {
    const mySavedArticle = mySavedArticles.find((i) => {
      if (myArticle) {
        return i.title === myArticle.title && i.text === myArticle.text;
      }
      if (article) {
        return i.title === article.title && i.text === article.description;
      }
      return '';
    });

    if (mySavedArticle) {
      handleDeleteSavedNews(mySavedArticle);
    } else {
      handleSaveNews(article, tag);
    }
  }

  // f проверки токена
  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsLoggedIn(true);
      getSavedNews();
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(JSON.parse(localStorage.getItem('user')));
            setIsLoggedIn(true);
          }
        });
    }
  }

  // проверка наличия токена в localstorage
  useEffect(() => {
    tokenCheck();
  }, [isLoggedIn]);

  // console.log('mySavedArticles', mySavedArticles);
  // console.log('articles', articles);

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path='/'>
            <Header
              isOpenBurgerMenu={burgerOpen}
              isOpen={handleClickBurger}
              isOpenLoginPopup={handleOpenLoginPopup}
              isLogout={handleLogout}
              isLoggedIn={isLoggedIn}
            />
            <SearchForm
              handleNewsSearch={handleSearchNews}
            />
            <Preloader
              isOpen={openPreloader}
            />
            <NoResult
              isOpen={openNoResults}
              searchError={searchError}
            />
            <Main
              articles={articles}
              mySavedArticles={mySavedArticles}
              keyword={keyword}
              isLoggedIn={isLoggedIn}
              handleOpenLoginPopup={handleOpenLoginPopup}
              updateMySavedArticles={updateMySavedArticles}
            />
          </Route>
          <Route path='/saved-news'>
            <Header
              isOpenBurgerMenu={burgerOpen}
              isOpen={handleClickBurger}
              isOpenLoginPopup={handleOpenLoginPopup}
              isLogout={handleLogout}
              isLoggedIn={isLoggedIn}
            />
            <ProtectedRoute path='/saved-news'
              component={Articles}
              loggedIn={isLoggedIn}
              handleOpenLoginPopup={handleOpenLoginPopup}
              handleDeleteSavedNews={handleDeleteSavedNews}
              updateMySavedArticles={updateMySavedArticles}
              mySavedArticles={mySavedArticles}
              keyword={keyword}
            />
          </Route>
        </Switch>
        <Footer
          scrollToTop={scrollToTop}
        />
        <section className="popups">
          <Register
            isOpen={openRegisterPopup}
            onClose={closeAllPopups}
            onSwitchPopup={handlePopupSwitcher}
            onRegister={handleRegister}
            textError={showErrorInPopup}
          />
          <Login
            isOpen={openLoginPopup}
            onClose={closeAllPopups}
            onSwitchPopup={handlePopupSwitcher}
            onLogin={handleLogin}
            textError={showErrorInPopup}
          />
          <PopupConfirm
           isOpen={openConfirmPopup}
           onClose={closeAllPopups}
           onLogin={handleLogin}
          />
        </section>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
