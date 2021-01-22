import React from 'react';
import './noResult.css';
import notFind from '../../images/not-find.png';

function NoResult({ isOpen, searchError }) {
  const noResultTextError = searchError
    ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
    : 'К сожалению по вашему запросу ничего не найдено.';

  const noResultTitleError = searchError ? '' : 'Ничего не найдено';

  return (
    <section className={`no-result ${isOpen ? 'no-result_active' : ''}`}>
      <div className="no-result__wrapper">
        <img className="no-result__logo" alt="Ничего не найдено" src={notFind}/>
        <h2 className="no-result__title">{noResultTitleError}</h2>
        <p className="no-result__subtitle">{noResultTextError}</p>
      </div>
    </section>
  );
}

export default NoResult;
