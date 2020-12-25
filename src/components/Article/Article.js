import React, { useEffect, useState } from 'react';
import './article.css';
import { useLocation } from 'react-router-dom';

function Article(props) {
  const { description } = props;
  const [currentResolution, setCurrentResolution] = useState(0);
  const { pathname } = useLocation();
  const buttonSwitcher = `${pathname === '/saved-news' ? 'article__trash' : 'article__bookmark'}`;
  const cardDescription = `${pathname === '/saved-news' ? 'article__tag article__tag_active' : 'article__tag'}`;

  useEffect((() => {
    function updateScreenWidth() {
      setCurrentResolution(window.innerWidth);
    }
    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
  }), []);

  return (
    <article className="article">
      <p className={cardDescription}>Природа</p>
      <button className={buttonSwitcher}/>
      <img className="article__image" src={description.image} alt={description.title}/>
      <a className="article__link" href={description.link} target="_blank" rel="noreferrer">
        <p className="article__date">{description.date}</p>
        <div className="article__wrapper">
          <h3 className="article__title">{(currentResolution <= 900 && description.title.length > 29) || (description.title.length > 40)
            ? `${description.title.substring(0, 26)}...`
            : description.title
          }</h3>
          <p className="article__content">{
            (currentResolution <= 900 && description.content.length > 140) || (description.content.length < 140)
              ? `${description.content.substring(0, 70)}...`
              : description.content
          }</p>
        </div>
        <p className="article__source">{description.source}</p>
      </a>
    </article>
  );
}

export default Article;
