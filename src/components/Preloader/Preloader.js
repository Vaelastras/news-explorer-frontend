import React from 'react';
import './preloader.css';

function Preloader() {
  return (
      <section className="preloader">
        <div className="preloader__wrapper">
          <div className="preloader__circle"/>
          <p className="preloader__text">Идет поиск новостей</p>
        </div>
      </section>
  );
}

export default Preloader;
