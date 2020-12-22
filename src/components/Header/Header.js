import React from 'react';
import './header.css';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header() {
  const { pathname } = useLocation();

  const headerLight = `${pathname === '/saved-news' ? 'header_type_light' : ''}`;
  const headerLogoDark = `${pathname === '/saved-news' ? 'header__logo_type_dark' : ''}`;
  return (
   <header className={`header ${headerLight}`}>
    <div className="header__wrapper">
      <Link to='/' className={`header__logo ${headerLogoDark}`}>News Explorer</Link>
      <Navigation />
    </div>
   </header>
  );
}

export default Header;
