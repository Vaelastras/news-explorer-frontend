import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import SearchForm from '../SearchForm/SearchForm';
import './app.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Articles from '../Articles/Articles';
import Summary from '../Summary/Summary';
import Footer from '../Footer/Footer';

import Register from '../Register/Register';
import Login from '../Login/Login';

import CurrentUserContext from '../../context/CurrentUserContext';
import scrollToTop from '../../utils/topScroll';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [openRegisterPopup, setOpenRegisterPopup] = useState(false);
  const [openLoginPopup, setIsOpenLoginPopup] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);

  // открытие бургерного меню
  function handleClickBurger() {
    setBurgerOpen(!burgerOpen);
  }
  // закрытие всех попапов
  function closeAllPopups() {
    setOpenRegisterPopup(false);
    setIsOpenLoginPopup(false);
  }

  // открытие окна регистрации
  function handleOpenRegisterPopup() {
    setOpenRegisterPopup(true);
  }
  // открытие окна логина
  function handleOpenLoginPopup() {
    setIsOpenLoginPopup(true);
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
            <Main />
          </Route>
          <Route path='/saved-news'>
            <Header
              isOpenBurgerMenu={burgerOpen}
              isOpen={handleClickBurger}
              isOpenLoginPopup={handleOpenLoginPopup}
            />
            <Summary/>
            <Articles/>
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
          />
          <Login
            isOpen={openLoginPopup}
            onClose={closeAllPopups}
            onSwitchPopup={handlePopupSwitcher}
          />
        </section>
        <Switch>
          <Route exact path='/'>
            <Header
              isOpenBurgerMenu={burgerOpen}
              isOpen={handleClickBurger}
              isOpenLoginPopup={handleOpenLoginPopup}

            />
            <SearchForm/>
            <Main />
          </Route>
          <Route path='/saved-news'>
            <Header
              isOpenBurgerMenu={burgerOpen}
              isOpen={handleClickBurger}
              isOpenLoginPopup={handleOpenLoginPopup}
            />
            <Summary/>
            <Articles/>
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
          />
          <Login
            isOpen={openLoginPopup}
            onClose={closeAllPopups}
            onSwitchPopup={handlePopupSwitcher}
          />
        </section>
        <Switch>
          <Route exact path='/'>
            <Header
              isOpenBurgerMenu={burgerOpen}
              isOpen={handleClickBurger}
              isOpenLoginPopup={handleOpenLoginPopup}

            />
            <SearchForm/>
            <Main />
          </Route>
          <Route path='/saved-news'>
            <Header
              isOpenBurgerMenu={burgerOpen}
              isOpen={handleClickBurger}
              isOpenLoginPopup={handleOpenLoginPopup}
            />
            <Summary/>
            <Articles/>
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
          />
          <Login
            isOpen={openLoginPopup}
            onClose={closeAllPopups}
            onSwitchPopup={handlePopupSwitcher}
          />
        </section>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
