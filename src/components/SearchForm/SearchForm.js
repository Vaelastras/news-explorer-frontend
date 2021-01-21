import React, { useState } from 'react';
import './searchForm.css';
import { handleKeywordFormatter } from '../../utils/helpers';

function SearchForm({ handleNewsSearch }) {
  const [searchRequest, setSearchRequest] = useState('');
  const [requestError, setRequestError] = useState(false);

  function handleSubmitForm(e) {
    e.preventDefault();
    if (searchRequest !== '') {
      handleNewsSearch(searchRequest);
      setSearchRequest('');
      return setRequestError(false);
    }
    return setRequestError(true);
  }

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmitForm} noValidate>
        <h1 className="search__title">Что творится в мире?</h1>
        <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
        <div className="search__wrapper">
          <input
            value={searchRequest}
            className="search__input"
            placeholder={`${requestError ? 'Вам нужно ввести ключевое слово ‼️️' : 'Введите тему новости'}`}
            onChange={ (e) => setSearchRequest(handleKeywordFormatter(e.target.value)) }
            required/>
          <button className="search__button">Искать</button>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
