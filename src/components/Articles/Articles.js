// ex-SavedNews

import React from 'react';
import './articles.css';
import Article from '../Article/Article';
import Summary from '../Summary/Summary';

function Articles({
  mySavedArticles,
  ...props
}) {
  return (
    <>
      <Summary
        mySavedArticles={mySavedArticles}
      />
      {mySavedArticles.length > 0 && <section className="articles">
          {
            mySavedArticles.map((article) => <Article
              mySavedArticle={article}
              key={article.link + Math.random()}
              keyword={article.keyword}
              title={article.title}
              date={article.date}
              image={article.image}
              link={article.link}
              description={article.text}
              source={article.source}
              isLoggedIn={props.isLoggedIn}
              handleOpenLoginPopup={props.handleOpenLoginPopup}
              updateMySavedArticles={props.updateMySavedArticles}
              mySavedArticles={mySavedArticles}
            />)
          }
        </section>

      }
    </>
  );
}

export default Articles;
