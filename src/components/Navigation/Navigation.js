import React, { useContext } from 'react';
import './navigation.css';
import { NavLink, useLocation } from 'react-router-dom';
import CurrentUserContext from '../../context/CurrentUserContext';

import logoutButtonLight from '../../images/icons/logout-ligth.png';
import logoutButtonDark from '../../images/icons/logout-dark.png';

function Navigation(props) {
  const currentUser = useContext(CurrentUserContext);
  const { isLoggedIn, isOpenLoginPopup } = props;
  const { pathname } = useLocation();

  const navLinkDark = `${pathname === '/saved-news' ? 'navigation__link_type_black' : ''}`;
  const navLinkActive = `${pathname === '/saved-news' ? 'navigation__link_type_active_dark' : 'navigation__link_type_active'}`;
  const navButtonLogin = `${pathname === '/' ? 'navigation__button' : 'navigation__button_type_hidden'}`;
  const navButtonLogout = `${pathname === '/saved-news' ? 'navigation__button navigation__button_type_logout' : 'navigation__button_type_hidden'}`;
  const navButtonColor = `${pathname === '/' ? logoutButtonLight : logoutButtonDark}`;

  const buttonDisplayName = `${isLoggedIn ? `${currentUser.name}` : 'Авторизоваться'}`; // подключить контекст/стейт currentUser.name
  return (
    <nav className="navigation">
      <div className="navigation__container">
        <ul className='navigation__list'>
          <li className='navigation__item'>
            <NavLink exact to="/" className={`navigation__link ${navLinkDark}`} activeClassName={navLinkActive}>Главная</NavLink>
          </li>
          <li className='navigation__item'>
            <NavLink to="/saved-news" className={`navigation__link ${navLinkDark}`} activeClassName={navLinkActive}>Сохранённые статьи</NavLink>
          </li>
        </ul>
        <button onClick={isOpenLoginPopup} className={navButtonLogin}>{buttonDisplayName}</button>
        <NavLink to="/" className="navigation__link">
          <button className={navButtonLogout}>Вася <img className="navigation__icon-logout" alt="logout button" src={navButtonColor}/></button>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;
