import React from 'react';
import './navigation.css';
import { NavLink, useLocation } from 'react-router-dom';

import logoutButtonLight from '../../images/icons/logout-ligth.png';
import logoutButtonDark from '../../images/icons/logout-dark.png';

function Navigation() {
  const { pathname } = useLocation();

  const navLinkBlack = `${pathname === '/saved-news' ? 'navigation__link_type_black' : ''}`;
  const navLinkActiveBlack = `${pathname === '/saved-news' ? 'navigation__link_type_active_black' : ''}`;
  const navButtonLogin = `${pathname === '/' ? 'navigation__button' : 'navigation__button_type_hidden'}`;
  const navButtonLogout = `${pathname === '/saved-news' ? 'navigation__button navigation__button_type_logout' : 'navigation__button_type_hidden'}`;
  const navButtonColor = `${pathname === '/' ? logoutButtonLight : logoutButtonDark}`;

  return (
    <nav className="navigation">
      <div className="navigation__container">
        {/* скорректировать цвета активных ссылок */}
        <NavLink to="/" className={`navigation__link ${navLinkBlack}`} activeClassName={`navigation__link_type_active ${navLinkActiveBlack}`}>Главная</NavLink>
        <NavLink to="/saved-news" className={`navigation__link ${navLinkBlack}`} activeClassName={`navigation__link_type_active ${navLinkActiveBlack}`}>Сохранённые статьи</NavLink>
        <button className={navButtonLogin}>Авторизоваться</button>
        <NavLink to="/" className="navigation__link">
          <button className={navButtonLogout}>Василий
            <img className="navigation__icon-logout" alt="logout button" src={navButtonColor}/>
          </button>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;
