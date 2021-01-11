import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import SearchForm from '../SearchForm/SearchForm';
import './app.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Articles from '../Articles/Articles';
import Footer from '../Footer/Footer';

import Register from '../Register/Register';
import Login from '../Login/Login';
import PopupConfirm from '../PopupConfirm/PopupConfirm';

import CurrentUserContext from '../../context/CurrentUserContext';
import scrollToTop from '../../utils/topScroll';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import NoResult from '../NoResult/NoResult';

import * as auth from '../../utils/MainApi';
import * as newsApi from '../../utils/NewsApi';

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // авторизационный стейт
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
  const [searchError, setSearchError] = useState(''); // вывод ошибок поиска в noResult

  const history = useHistory();

  // f проверки токена
  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser({
              id: res.data._id,
              name: res.data.name,
            });
            setLoggedIn(true);
          }
        });
    }
  }

  // проверка наличия токена в localstorage
  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

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
    setOpenRegisterPopup(true);
  }
  // открытие окна логина
  function handleOpenLoginPopup() {
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
        setShowErrorInPopup(err.message);
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
              localStorage.setItem('jwt', JSON.stringify(data));
              setCurrentUser(data);
              setLoggedIn(true);
              closeAllPopups();
              history.push('./');
            })
            .catch((err) => {
              console.warn(err.message);
            });
        }
      })
      .catch((err) => {
        setShowErrorInPopup(err.message);
      });
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
            />
            <SearchForm/>
            <Preloader
              isOpen={openPreloader}
            />
            <NoResult
              isOpen={openNoResults}
              searchError={searchError}
            />
            <Main />
          </Route>
          <Route path='/saved-news'>
            <Header
              isOpenBurgerMenu={burgerOpen}
              isOpen={handleClickBurger}
              isOpenLoginPopup={handleOpenLoginPopup}
            />
            <ProtectedRoute path='/saved-news'
              loggedIn={loggedIn}
              component={Articles}
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
          />
        </section>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
