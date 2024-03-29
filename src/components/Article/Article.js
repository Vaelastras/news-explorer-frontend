import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NEWS_DEFAULT_IMG } from '../../utils/constants';
import { handleValidityUrl, handleDateFormatter } from '../../utils/helpers';
import './article.css';

function Article({
  isLoggedIn, handleOpenLoginPopup, updateMySavedArticles, mySavedArticles, ...props
}) {
  const { pathname } = useLocation();
  const [fillBookmark, setFillBookmark] = useState(false); // для закрашивания флажка
  const buttonSwitcher = `${pathname === '/saved-news' ? 'article__trash' : `${fillBookmark && isLoggedIn ? 'article__bookmark article__bookmark_type_marked' : 'article__bookmark'}`}`;
  const cardDescription = `${pathname === '/saved-news' ? 'article__keyword article__keyword_active' : 'article__keyword'}`;

  useEffect(() => {
    if (mySavedArticles) {
      setFillBookmark(
        mySavedArticles.find((i) => i.title === props.title) !== undefined,
      );
    }
  }, [mySavedArticles, fillBookmark, isLoggedIn]);

  function handleUpdateSavedArticles() {
    updateMySavedArticles(props.article, props.keyword, props.mySavedArticle);
  }

  return (
    <article className="article">
      <p className={cardDescription}>{props.keyword}</p>
      {
        isLoggedIn
          ? (<button onClick={handleUpdateSavedArticles} className={buttonSwitcher}/>)
          : (<button onClick={handleOpenLoginPopup} className="article__bookmark article__bookmark_type_inactive"/>)
      }
      <img className="article__image" src={handleValidityUrl(props.image) ? props.image : NEWS_DEFAULT_IMG} alt={props.title || props.description || 'Иллюстрация к статье'}/>
      <a className="article__link" href={props.link} target="_blank" rel="noreferrer">
        <p className="article__date">{handleDateFormatter(props.date)}</p>
        <div className="article__wrapper">
          <h3 className="article__title">{props.title} </h3>
          <p className="article__content"> {props.description}</p>
        </div>
        <p className="article__source">{props.source}</p>
      </a>
    </article>
  );
}

export default Article;
