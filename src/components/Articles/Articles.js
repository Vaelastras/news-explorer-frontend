// ex-SavedNews

import React from 'react';
import './articles.css';
import Article from '../Article/Article';
import sampleCards from '../../utils/sampleCards';

function Articles() {
  return (
    <section className="articles">
      {
        sampleCards.map((card, i) => <Article description={card} key={i}/>)
      }
    </section>
  );
}

export default Articles;
