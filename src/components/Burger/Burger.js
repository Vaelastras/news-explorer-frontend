import React from 'react';
import './burger.css';
import { NavLink, useLocation } from 'react-router-dom';
import logoutButtonDark from '../../images/icons/logout-dark.png';

function Burger(props) {
  const { isOpen, isOpenBurgerMenu, isOpenLoginPopup } = props;
  const { pathname } = useLocation();

  const buttonLogin = `${pathname === '/' ? 'burger__link-button burger__link-button_white' : 'burger__link-button_type_hidden'}`;
  const buttonLogout = `${pathname === '/saved-news' ? 'burger__link-button burger__link-button_dark' : 'burger__link-button_type_hidden'}`;
  const textColorization = `${pathname === '/' ? 'burger__link_white burger__link' : 'burger__link burger__link_dark'}`;
  const backgroundColor = `${pathname === '/saved-news' ? 'burger__list_white' : 'burger__list_dark'}`;
  const crossButtonDark = `${pathname === '/saved-news' && isOpenBurgerMenu ? 'burger__button-cross_type_dark' : ''}`;
  const crossBurgerColorDark = `${pathname === '/saved-news' && !isOpenBurgerMenu ? 'burger__button_type_dark' : ''}`;
  const buttonSwitcher = props.isOpenBurgerMenu ? 'burger__button-cross' : 'burger__button';

  return (
    <div className="burger">

      <input type="checkbox" id="checkbox" className="burger__checkbox" onClick={isOpen}/>
      <label htmlFor="checkbox" className={`${buttonSwitcher} ${crossButtonDark} ${crossBurgerColorDark}`}/>
      <div className={(isOpen ? `burger__list burger__list_active burger__layout ${backgroundColor}` : `${backgroundColor}`)}>
        <div className="burger__container">
          <ul className="burger__roster">
            <li className="burger__roster-list"><NavLink exact to="/" className={textColorization}>Главная</NavLink></li>
            <li className="burger__roster-list"><NavLink to="/saved-news" className={textColorization}>Сохранённые статьи</NavLink></li>
          </ul>

          <button className={buttonLogin} onClick={isOpenLoginPopup} >Авторизоваться</button>
          <NavLink to="/" className={textColorization}>
            <button className={buttonLogout}>Витенька <img className="burger__icon-logout" alt="logout button" src={logoutButtonDark}/> </button>
          </NavLink>
        </div>
      </div>

    </div>
  );
}

export default Burger;
