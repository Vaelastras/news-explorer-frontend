import React, { useState, useEffect } from 'react';
import './articles-list.css';
import Article from '../Article/Article';
import { CARDS_TO_SHOW } from '../../utils/constants';

function ArticlesList({
  articles,
  keyword,
  isLoggedIn,
  handleOpenLoginPopup,
  updateMySavedArticles,
  mySavedArticles,
}) {
  const [renderArticles, setRenderArticles] = useState([]);
  const [buttonHidden, setButtonHidden] = useState(true);

  useEffect(() => {
    setRenderArticles(articles.slice(0, CARDS_TO_SHOW));
    if (articles.length <= CARDS_TO_SHOW) {
      return setButtonHidden(false);
    }
    return setButtonHidden(true);
  }, [articles]);

  function showMoreArticles() {
    setRenderArticles(articles.slice(0, renderArticles.length + CARDS_TO_SHOW));
    if (renderArticles.length >= articles.length - CARDS_TO_SHOW) {
      setButtonHidden(false);
    }
  }

  return (
    <section className={renderArticles.length > 0 ? 'articles-list' : 'articles-list_type_hidden'}>
      <h2 className="articles-list__title">Результаты поиска</h2>
      <div className="articles-list__wrapper">
        {
          renderArticles.map((article) => <Article
              article={article}
              key={article.url + Math.random()}
              keyword={keyword}
              title={article.title}
              date={article.publishedAt}
              image={article.urlToImage}
              link={article.url}
              description={article.description}
              source={article.source.name}
              isLoggedIn={isLoggedIn}
              mySavedArticles={mySavedArticles}
              handleOpenLoginPopup={handleOpenLoginPopup}
              updateMySavedArticles={updateMySavedArticles}
            />)
        }
      </div>
      {articles.length > 3 && <button onClick={showMoreArticles} className={buttonHidden ? 'articles-list__button' : 'articles-list__button_hidden'}>Показать еще</button>}
    </section>
  );
}

export default ArticlesList;
