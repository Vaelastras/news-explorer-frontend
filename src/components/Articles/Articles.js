// ex-SavedNews

import React from 'react';
import './articles.css';
import Article from '../Article/Article';
import Summary from '../Summary/Summary';

function Articles({
  isLoggedIn,
  handleOpenLoginPopup,
  handleDeleteSavedNews,
  updateMySavedArticles,
  mySavedArticles,
  // keyword,
}) {
  return (
    <>
      <Summary />
      {mySavedArticles.length > 0 && <section className="articles">
          {
            mySavedArticles.map((article, index) => <Article
              article={article}
              key={index || article.id + article.url + Math.floor(Math.random())}
              keyword={article.keyword}
              title={article.title}
              date={article.publishedAt}
              image={article.urlToImage}
              link={article.url}
              description={article.description}
              source={article.source.name}
              isLoggedIn={isLoggedIn}
              handleOpenLoginPopup={handleOpenLoginPopup}
              handleDeleteSavedNews={handleDeleteSavedNews}
              updateMySavedArticles={updateMySavedArticles}
              mySavedArticles={mySavedArticles}
            />)
          }
        </section>

      }
    </>
  );
}

export default Articles;

// mySavedArticles.map((article, i) => <Article
//               article={article}
//               key={i + article.url}
//               title={article.title}
//               date={article.publishedAt}
//               image={article.urlToImage}
//               link={article.url}
//               description={article.description}
//               source={article.source.name}
//               keyword={article.keyword || keyword}
//               isLoggedIn={isLoggedIn}
//               handleOpenLoginPopup={handleOpenLoginPopup}
//               handleDeleteSavedNews={handleDeleteSavedNews}
//               updateMySavedArticles={updateMySavedArticles}
//               mySavedArticles={mySavedArticles}
//             />)
