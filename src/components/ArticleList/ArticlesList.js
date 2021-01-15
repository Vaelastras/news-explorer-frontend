import React, { useState, useEffect } from 'react';
import './articles-list.css';
import Article from '../Article/Article';

function ArticlesList({
  articles, keyword, isLoggedIn, handleOpenLoginPopup, updateMySavedArticles,
}) {
// Функционал кнопки "Показать еще"
  // 1. Создать стейт отрисовки где будут лежать все карты из артиклов
  // 2. Создать стейт для отрисовки кнопки "Показать еще"
  // 3. Нажимаем на кнопку - из стейта отрисовки берутся карты по 3 штуки
  // 4. Если статей больше нет - прячем кнопку
  // 5. если карт в главном стейте нет вообще - то ничего и не отрисовываем

  //  все это будет зависеть от списка статей в глобальном стейте - если изменяется исходный массив - выполнить заново

  const [renderArticles, setRenderArticles] = useState([]);
  const [buttonState, setButtonState] = useState(true);

  useEffect(() => {
    setRenderArticles(articles.slice(0, 3));
    if (articles.length <= 3) {
      setButtonState(false);
    } else {
      setButtonState(true);
    }
  }, [articles]);

  // записать в стейт рендера начальный массив артиклов -
  // отрезать по +3 карты
  // повторить пока длина массива рендера не будет >= 3 чем начальный массив - тогда спрячем кнопку
  function showMoreArticles() {
    setRenderArticles(articles.slice(0, renderArticles.length + 3));
    if (renderArticles.length >= articles.length - 3) {
      setButtonState(false);
    }
  }

  return (
    <section className={renderArticles.length > 0 ? 'articles-list' : 'articles-list_type_hidden'}>
      <h2 className="articles-list__title">Результаты поиска</h2>
      <div className="articles-list__wrapper">
        {
          renderArticles.map((article, index) => <Article
              article={article}
              key={index + article.url}
              keyword={keyword}
              title={article.title}
              date={article.publishedAt}
              image={article.urlToImage}
              link={article.url}
              description={article.description}
              source={article.source.name}
              isLoggedIn={isLoggedIn}
              handleOpenLoginPopup={handleOpenLoginPopup}
              updateMySavedArticles={updateMySavedArticles}
            />)
        }
      </div>
      {articles.length > 3 && <button onClick={showMoreArticles} className={buttonState ? 'articles-list__button' : 'articles-list__button_hidden'}>Показать еще</button>}
    </section>
  );
}

export default ArticlesList;
