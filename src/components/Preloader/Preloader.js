import React from 'react';
import './preloader.css';

function Preloader({ isOpen }) {
  return (
      <section className={`preloader ${isOpen ? 'preloader_active' : ''}`}>
        <div className="preloader__wrapper">
          <div className="preloader__circle"/>
          <p className="preloader__text">Идет поиск новостей</p>
        </div>
      </section>
  );
}

export default Preloader;

