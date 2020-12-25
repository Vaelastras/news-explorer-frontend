import React, { useState } from 'react';
import About from '../About/About';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import './App.css';
import Header from '../Header/Header';
import Articles from '../Articles/Articles';
import Summary from '../Summary/Summary';
import ArticlesList from '../ArticleList/ArticlesList';

function App() {
  // const [isOpenRegisterPopup, setIsOpenRegisterPopup] = useState('');
  // const [isOpenConfirmPopup, setIsOpenConfirmPopup] = useState('');
  // const [isOpenLoginPopup, setIsOpenLoginPopup] = useState('');
  // const [loggedIn, setLoggedIn] = useState(true);
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  //
  // function closeAllPopups() {
  //   setIsOpenConfirmPopup(false);
  //   setIsOpenRegisterPopup(false);
  //   setIsOpenLoginPopup(false);
  // }
  //
  // function handleOpenRegisterPopup() {
  //   isOpenRegisterPopup(true);
  // }
  //
  // function handleOpenLoginPopup() {
  //   isOpenLoginPopup(true);
  // }
  //
  // function handleOpenConfirmPopup() {
  //   isOpenConfirmPopup(true);
  // }

  // function handlePopupSwitcher() {
  //   if (isOpenRegisterPopup) {
  //     handleOpenRegisterPopup();
  //     setIsOpenRegisterPopup(false);
  //   }
  //   if (isOpenLoginPopup) {
  //     handleOpenLoginPopup();
  //     setIsOpenLoginPopup(false);
  //   }
  //   if (isOpenConfirmPopup) {
  //     handleOpenConfirmPopup();
  //     setIsOpenConfirmPopup(false);
  //   }
  // }
  function handleClickBurger() {
    setBurgerMenuOpen(!burgerMenuOpen);
  }

  return (
    <>
      <Header
        isOpenBurgerMenu={burgerMenuOpen}
        isOpen={handleClickBurger}
      />
      <SearchForm/>
      <ArticlesList/>
      <About/>
      <Footer/>
      <Summary/>
      <Articles/>

    </>
  );
}

export default App;
