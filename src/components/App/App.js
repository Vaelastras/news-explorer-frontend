import React, {useState} from 'react';
import About from '../About/About';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import './App.css';

function App () {
  const [isOpenRegisterPopup, setIsOpenRegisterPopup] = useState('');
  const [isOpenConfirmPopup, setIsOpenConfirmPopup] = useState('');
  const [isOpenLoginPopup, setIsOpenLoginPopup] = useState('')

  function closeAllPopups () {
    setIsOpenConfirmPopup(false);
    setIsOpenRegisterPopup(false);
    setIsOpenLoginPopup(false);
  }

  function handleOpenRegisterPopup() {
    isOpenRegisterPopup(true);
  }

  function handleOpenLoginPopup () {
    isOpenLoginPopup(true);
  }

  function handleOpenConfirmPopup () {
    isOpenConfirmPopup(true);
  }

  function handlePopupSwitcher () {
    if (isOpenRegisterPopup) {
      handleOpenRegisterPopup();
      setIsOpenRegisterPopup(false);
    }
    if (isOpenLoginPopup) {
      handleOpenLoginPopup();
      setIsOpenLoginPopup(false)
    }
    if (isOpenConfirmPopup) {
      handleOpenConfirmPopup();
      setIsOpenConfirmPopup(false);
    }
  }



  return (
    <>
      <SearchForm/>
      <About/>
      <Footer/>
    </>
  );
}

export default App;
