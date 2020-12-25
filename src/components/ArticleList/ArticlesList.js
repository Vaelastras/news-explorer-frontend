import React from 'react';
import './articles-list.css';
import sampleCards from '../../utils/sampleCards';
import Article from '../Article/Article';

function ArticlesList() {
  return (
    <section className="articles-list">
      <h2 className="articles-list__title">Результаты поиска</h2>
      <div className="articles-list__wrapper">
        { sampleCards.map((card, i) => <Article description={card} key={i} />) }
      </div>
      <button className="articles-list__button">Показать еще</button>
    </section>
  );
}

export default ArticlesList;
