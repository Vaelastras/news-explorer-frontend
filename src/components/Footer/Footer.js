import React from 'react';
import './footer.css';
import gitLogo from "../../images/icons/github.png";
import facebook from "../../images/icons/facebook.png";
import gmail from "../../images/icons/email.png";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyrigth">
        &copy; {new Date().getFullYear()} Supersite, Powered by News API
      </p>
      <div className="footer__wrapper">
        <ul className="footer__links">
          <li className="footer__list">
            <a className ="footer__link" href="./" target="_blank">Главная</a>
          </li>
          <li className="footer__list">
            <a className ="footer__link" href="https://praktikum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
        </ul>
        <ul className="footer__social-links">
          <li className="footer__social-link">
            <a href="https://github.com/Vaelastras" target="_blank" rel="noreferrer"><img className ="footer__social-icon" src={gitLogo} alt='Github logo'/></a>
          </li>
          <li className="footer__social-link">
            <a href="https://www.facebook.com/Vaelastras/" target="_blank" rel="noreferrer"><img className ="footer__social-icon" src={facebook} alt='facebook'/></a>
          </li>
          <li className="footer__social-link">
            <a href="mailTo: vaelastras@gmail.com" target="_blank" rel="noreferrer"><img className ="footer__social-icon" src={gmail} alt='facebook'/></a>
          </li>
        </ul>
      </div>

    </footer>
  )

}

export default Footer;
