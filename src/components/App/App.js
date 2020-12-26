import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import SearchForm from '../SearchForm/SearchForm';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Articles from '../Articles/Articles';
import Summary from '../Summary/Summary';
import Footer from '../Footer/Footer';
import PopupRegister from '../PopupRegister/PopupRegister';
import PopupLogin from '../PopupLogin/PopupLogin';

function App() {
  const [openRegisterPopup, setIsOpenRegisterPopup] = useState(false);
  const [openLoginPopup, setIsOpenLoginPopup] = useState(false);
  // const [isOpenConfirmPopup, setIsOpenConfirmPopup] = useState(false);
  // const [loggedIn, setLoggedIn] = useState(true);
  const [burgerOpen, setBurgerOpen] = useState(false);
  // открытие бургерного меню
  function handleClickBurger() {
    setBurgerOpen(!burgerOpen);
  }
  // закрытие всех попапов
  function closeAllPopups() {
    // setIsOpenConfirmPopup(false);
    setIsOpenRegisterPopup(false);
    setIsOpenLoginPopup(false);
  }

  // открытие окна регистрации
  function handleOpenRegisterPopup() {
    setIsOpenRegisterPopup(true);
  }
  // открытие окна логина
  function handleOpenLoginPopup() {
    openLoginPopup(true);
  }

  // function handleOpenConfirmPopup() {
  //   isOpenConfirmPopup(true);
  // }
  // переключатель попапов
  function handlePopupSwitcher() {
    if (openRegisterPopup) {
      handleOpenRegisterPopup();
      setIsOpenRegisterPopup(false);
    }
    if (openLoginPopup) {
      handleOpenLoginPopup();
      setIsOpenLoginPopup(false);
    }
  //   if (isOpenConfirmPopup) {
  //     handleOpenConfirmPopup();
  //     setIsOpenConfirmPopup(false);
  //   }
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
  });

  function topScrollPage() {
    if (window.pageYOffset > 0) {
      window.scroll(0, 0);
    }
  }

  return (
    <div className='page'>
      <Switch>
        <Route exact path='/'>
          <Header
            isOpenBurgerMenu={burgerOpen}
            isOpen={handleClickBurger}
            isOpenRegisterPopup={handleOpenRegisterPopup}
          />
          <SearchForm/>
          <Main />
        </Route>
        <Route path='/saved-news'>
          <Header
            isOpenBurgerMenu={burgerOpen}
            isOpen={handleClickBurger}
          />
          <Summary/>
          <Articles/>
        </Route>
      </Switch>
      <Footer
        topScrollPage={topScrollPage}
      />

      <PopupRegister
        isOpen={openRegisterPopup}
        onClose={closeAllPopups}
        onSwitchPopup={handlePopupSwitcher}
      />
      <PopupLogin
        isOpenLoginPopup={openLoginPopup}
        onClose={closeAllPopups}
        onSwitchPopup={handlePopupSwitcher}
      />
    </div>
  );
}

export default App;
