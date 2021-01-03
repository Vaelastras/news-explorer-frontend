import React from 'react';
import './header.css';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Burger from '../Burger/Burger';

function Header({
  isOpen, isOpenBurgerMenu, isOpenLoginPopup, isLoggedIn,
}) {
  const { pathname } = useLocation();

  const headerLight = `${pathname === '/saved-news' ? 'header_type_light' : ''}`;
  const headerDark = `${pathname === '/' ? 'header_type_dark' : ''}`;
  const headerLogoDark = `${pathname === '/saved-news' ? 'header__logo_type_dark' : ''}`;
  const headerBg = `${pathname === '/' && isOpenBurgerMenu ? `header ${headerDark}` : `header ${headerLight}`}`;

  return (
   <header className={headerBg}>
    <div className="header__wrapper">
      <Link to='/' className={`header__logo ${headerLogoDark}`}>News Explorer</Link>
      <Navigation
        isOpenLoginPopup={isOpenLoginPopup}
      />
      <Burger
        isOpen={isOpen}
        isOpenBurgerMenu={isOpenBurgerMenu}
        isOpenLoginPopup={isOpenLoginPopup}
        isLoggedIn={isLoggedIn}
        />
    </div>
   </header>
  );
}

export default Header;
