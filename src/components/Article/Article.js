import React, { useEffect, useState } from 'react';
import './article.css';
import { useLocation } from 'react-router-dom';
import newsDefaultImage from '../../images/news-default.jpg';

function Article({
  article, isLoggedIn, handleOpenLoginPopup, updateMySavedArticles, mySavedArticles, keyword,
}) {
  // const [savedArticle, setSavedArticle] = useState(false);
  const { pathname } = useLocation();

  // eslint-disable-next-line no-unused-vars
  const [currentResolution, setCurrentResolution] = useState(0); // измерение текущего разрешения страницы
  const [fillBookmark, setFillBookmark] = useState(false); // для закрашивания флажка

  const buttonSwitcher = `${pathname === '/saved-news' ? 'article__trash' : `${isLoggedIn && fillBookmark ? 'article__bookmark article__bookmark_type_marked' : 'article__bookmark article__bookmark_type_inactive'}`}`;
  // отображение ключевого слова
  const cardDescription = `${pathname === '/saved-news' ? 'article__keyword article__keyword_active' : 'article__keyword'}`;
  // const button = `${ pathname === '/saved-news' ? 'news-card__button-delete' : `${loggedIn && activeFlag ? 'news-card__button news-card__button_saved' : 'news-card__button news-card__button_no-saved'}`}`;

  // обрезка лишних символов на карте
  useEffect((() => {
    function updateScreenWidth() {
      setCurrentResolution(window.innerWidth);
    }
    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
  }), []);

  useEffect(() => {
    if (isLoggedIn) {
      if (mySavedArticles) {
        setFillBookmark(
          mySavedArticles.find((i) => i.title === article.title) !== undefined,
        );
      }
    }
  }, [mySavedArticles, fillBookmark, isLoggedIn]);

  function buttonClick() {
    updateMySavedArticles(article, keyword, mySavedArticles);
  }

  // форматирование даты на карте
  function handleDateFormatter(date) {
    const month = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
    ];

    const timeIsNow = new Date(date);
    const dataFormat = `${timeIsNow.getDate()} ${month[timeIsNow.getMonth()]} ${timeIsNow.getFullYear()} `;
    return dataFormat;
  }

  return (
    <article className="article">
      <p className={cardDescription}>{keyword}</p>
      {
        isLoggedIn
          ? (
          <button onClick={buttonClick} className={buttonSwitcher}></button>
          )
          : (
          <button onClick={handleOpenLoginPopup} className="article__bookmark article__bookmark_type_inactive"/>
          )
      }

      {/* <button onClick={isLoggedIn ? buttonClick : handleOpenLoginPopup} className={buttonSwitcher}/> */}
      <img className="article__image" src={article.image || newsDefaultImage} alt={article.title}/>
      <a className="article__link" href={article.link} target="_blank" rel="noreferrer">
        <p className="article__date">{handleDateFormatter(article.date)}</p>
        <div className="article__wrapper">
          <h3 className="article__title"> {article.title}
            {/* {
            (currentResolution <= 900 && props.title.length > 29) || (props.title.length > 40)
              ? `${props.title.substring(0, 40)}...`
              : props.title || props.description
          } */}
          </h3>
          <p className="article__content">
            {/* {
            (currentResolution <= 900 && props.description.length > 140) || (props.description.length < 140)
              ? `${props.description.substring(0, 70)}...`
              : props.description || props.title
          } */}
          {article.description}
          </p>
        </div>
        <p className="article__source">{article.source}</p>
      </a>
    </article>
  );
}

export default Article;
