import React, { useEffect, useState } from 'react';
import './article.css';
import { useLocation } from 'react-router-dom';
import newsDefaultImage from '../../images/news-default.jpg';

function Article({
  isLoggedIn, handleOpenLoginPopup, updateMySavedArticles, mySavedArticles, ...props
}) {
  const { pathname } = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [currentResolution, setCurrentResolution] = useState(0); // измерение текущего разрешения страницы
  const [fillBookmark, setFillBookmark] = useState(false); // для закрашивания флажка

  const buttonSwitcher = `${pathname === '/saved-news' ? 'article__trash' : `${fillBookmark && isLoggedIn ? 'article__bookmark article__bookmark_type_marked' : 'article__bookmark'}`}`;
  // отображение ключевого слова
  const cardDescription = `${pathname === '/saved-news' ? 'article__keyword article__keyword_active' : 'article__keyword'}`;

  // обрезка лишних символов на карте
  useEffect((() => {
    function updateScreenWidth() {
      setCurrentResolution(window.innerWidth);
    }
    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
  }), []);

  useEffect(() => {
    if (mySavedArticles) {
      setFillBookmark(
        mySavedArticles.find((i) => i.title === props.title) !== undefined,
      );
    }
  }, [mySavedArticles, fillBookmark, isLoggedIn]);

  function handleButtonClick() {
    updateMySavedArticles(props.article, props.keyword, props.mySavedArticle);
  }
  // форматирование даты на карте
  function handleDateFormatter(date) {
    const month = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
    ];

    const timeIsNow = new Date(date);
    return `${timeIsNow.getDate()} ${month[timeIsNow.getMonth()]} ${timeIsNow.getFullYear()} `;
  }

  // eslint-disable-next-line consistent-return,no-unused-vars
  function handleTextCutter(resolution, text) {
    if (resolution <= 500) { return text.substring(0); }
  }
  return (
    <article className="article">
      <p className={cardDescription}>{props.keyword}</p>
      {
        isLoggedIn
          ? (
          <button onClick={handleButtonClick} className={buttonSwitcher}/>
          )
          : (
          <button onClick={handleOpenLoginPopup} className="article__bookmark article__bookmark_type_inactive"/>
          )
      }
      <img className="article__image" src={props.image || newsDefaultImage} alt={props.title}/>
      <a className="article__link" href={props.link } target="_blank" rel="noreferrer">
        <p className="article__date">{handleDateFormatter(props.date)}</p>
        <div className="article__wrapper">
          <h3 className="article__title">
            { props.title
            // (currentResolution <= 900 && props.title.length > 29) || (props.title.length > 40)
            //   ? `${props.title.substring(0, 40)}...`
            //   : props.title || props.description
            }
          </h3>
          <p className="article__content">
            {
              (currentResolution <= 900 && props.description.length > 140) || (props.description.length < 140)
                ? `${props.description.substring(0, 70)}...`
                : props.description || props.title
            }
          </p>
        </div>
        <p className="article__source">{props.source}</p>
      </a>
    </article>
  );
}

export default Article;
