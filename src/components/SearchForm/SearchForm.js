import React from 'react';
import './searchForm.css';

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <h1 className="search__title">Что творится в мире?</h1>
        <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
        <div className="search__wrapper">
          <input className="search__input" placeholder="Введите тему новости" required/>
          <button className="search__button">Искать</button>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
