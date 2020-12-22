import React from 'react';
import './noResult.css';
import notFind from '../../images/not-find.png';

function NoResult() {
  return (
    <section className="no-result">
      <div className="no-result__wrapper">
        <img className="no-result__logo" alt="Ничего не найдено" src={notFind}/>
        <h2 className="no-result__title">Ничего не найдено</h2>
        <p className="no-result__subtitle">К сожалению по вашему запросу ничего не найдено.</p>
      </div>
    </section>
  );
}

export default NoResult;
