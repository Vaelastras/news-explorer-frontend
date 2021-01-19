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
import * as mainApi from '../../utils/MainApi';
import getArticlesFromServer from '../../utils/NewsApi';

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
  const [searchError, setSearchError] = useState(false); // вывод ошибок поиска в noResult

  // стейты данных с сервера newsApi
  const [articles, setArticles] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [mySavedArticles, setMySavedArticles] = useState([]);
  const history = useHistory();

  function getSavedNews() {
    mainApi.getAllArticles()
      .then((data) => {
        setMySavedArticles(data);
        setKeyword(data.keyword);
      });
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsLoggedIn(true);
      getSavedNews();
      mainApi.getUserContent(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(JSON.parse(localStorage.getItem('user')));
            setIsLoggedIn(true);
          }
        });
    }
  }

  useEffect(() => {
    tokenCheck();
  }, [isLoggedIn]);

  useEffect(() => {
    setKeyword(localStorage.getItem('keyword'));
  }, [keyword]);

  function handleClickBurger() {
    setBurgerOpen(!burgerOpen);
  }

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

  function handleRegister(email, password, name) {
    mainApi.createUser(email, password, name)
      .then((res) => {
        if (res) {
          closeAllPopups();
          setOpenConfirmPopup(true);
          history.push('./');
        }
      })
      .catch((errCode) => {
        if (errCode === 409) {
          return setShowErrorInPopup('Email уже регистрировался');
        }
        if (errCode === 429) {
          return setShowErrorInPopup('Превышено количество запросов');
        }
        return '';
      });
  }

  function handleLogin(email, password) {
    mainApi.authorizeUser(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        if (res) {
          mainApi.getUserContent(res.token)
            .then((userData) => {
              localStorage.setItem('user', JSON.stringify(userData));
              setCurrentUser(userData);
              setIsLoggedIn(true);
              setOpenNoResults(false);
              setSearchError(null);
              setKeyword('');
              localStorage.setItem('login', true);
              closeAllPopups();
              history.push('./');
            })
            .catch((err) => {
              setShowErrorInPopup(`${err}`);
            });
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          return setShowErrorInPopup('Неправильный логин или пароль');
        }
        if (err.status === 400) {
          return setShowErrorInPopup('Такого пользователя не существует!');
        }
        return setShowErrorInPopup('Вы взломали Пентагон, за вами выехали 👮🏻‍️');
      });
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setOpenNoResults(false);
    setArticles([]);
    localStorage.clear();
    history.push('/');
  }

  function handleSearchNews(tag) {
    setOpenNoResults(false);
    setOpenPreloader(true);
    getArticlesFromServer(tag)
      .then((data) => {
        localStorage.setItem('articles', JSON.stringify(data.articles));
        localStorage.setItem('keyword', tag);
        setArticles(data.articles);
        setKeyword(tag);
        if (data.articles.length === 0) {
          setSearchError(false);
          setOpenNoResults(true);
        }
      })
      .catch((err) => {
        setOpenNoResults(true);
        setSearchError(err.message);
      })
      .finally(() => setOpenPreloader(false));
  }

  function handleSaveNews(article, tag) {
    if (isLoggedIn) {
      mainApi.saveArticle(article, tag)
        .then(() => getSavedNews())
        .catch((err) => Promise.reject(new Error(`Error: ${err}`)));
    }
    return '';
  }

  function handleDeleteSavedNews(article) {
    mainApi.deleteArticle(article)
      .then(() => {
        const myArticleArray = mySavedArticles.filter((i) => (i._id !== article._id));
        setMySavedArticles(myArticleArray);
      })
      .catch((err) => {
        Promise.reject(new Error(`Error ${err}`));
      });
  }

  function handleUpdateMySavedArticles(article, tag, myArticle) {
    const mySavedArticle = mySavedArticles.find((i) => {
      if (myArticle) {
        return i.title === myArticle.title && i.text === myArticle.text;
      }
      if (article) {
        return i.title === article.title && i.text === article.description;
      }
      return null;
    });

    if (mySavedArticle) {
      return handleDeleteSavedNews(mySavedArticle);
    }
    return handleSaveNews(article, tag);
  }

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
              updateMySavedArticles={handleUpdateMySavedArticles}
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
              isLoggedIn={isLoggedIn}
              handleOpenLoginPopup={handleOpenLoginPopup}
              updateMySavedArticles={handleUpdateMySavedArticles}
              mySavedArticles={mySavedArticles}
              keyword={keyword}
            />
          </Route>
        </Switch>
        <Footer/>
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
