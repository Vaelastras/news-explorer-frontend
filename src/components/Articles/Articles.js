// ex-SavedNews

import React from 'react';
import './articles.css';
import Article from '../Article/Article';
import sampleCards from '../../utils/sampleCards';
import Summary from '../Summary/Summary';

function Articles() {
  return (
    <section className="articles">
      <Summary />
      {
        sampleCards.map((card, i) => <Article description={card} key={i}/>)
      }
    </section>
  );
}

export default Articles;
