import React from 'react';
import { Link } from 'react-router-dom';
import { scrollPageToTop } from '../../utils/helpers';
import './footer.css';
import gitLogo from '../../images/icons/github.png';
import facebook from '../../images/icons/facebook.png';
import gmail from '../../images/icons/email.png';
import vk from '../../images/icons/vk.png';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} Supersite, Powered by News API
      </p>
      <div className="footer__wrapper">
        <ul className="footer__links">
          <li className="footer__list">
            <Link className="footer__link" to='/' onClick={scrollPageToTop}>Главная</Link>
          </li>
          <li className="footer__list">
            <a className="footer__link" href="https://praktikum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
        </ul>
        <ul className="footer__social-links">
          <li className="footer__social-link">
            <a href="https://github.com/Vaelastras" target="_blank" rel="noreferrer"><img className="footer__social-icon" src={gitLogo} alt='Github logo'/></a>
          </li>
          <li className="footer__social-link">
            <a href="https://www.facebook.com/Vaelastras/" target="_blank" rel="noreferrer"><img className="footer__social-icon" src={facebook} alt='facebook'/></a>
          </li>
          <li className="footer__social-link">
            <a href="mailto:vaelastras@gmail.com" target="_blank" rel="noreferrer"><img className="footer__social-icon" src={gmail} alt='mail me'/></a>
          </li>
          <li className="footer__social-link">
            <a href="https://vk.com/vaelastras" target="_blank" rel="noreferrer"><img className ="footer__social-icon" src={vk} alt='vk'/></a>
          </li>
        </ul>
      </div>

    </footer>
  );
}

export default Footer;
