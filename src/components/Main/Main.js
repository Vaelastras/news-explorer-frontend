import React from 'react';
import './main.css';
import About from '../About/About';
import ArticlesList from '../ArticleList/ArticlesList';

function Main({
  articles,
  keyword,
  isLoggedIn,
  handleOpenLoginPopup,
  mySavedArticles,
  updateMySavedArticles,
}) {
  return (
    <main className="content">
      <ArticlesList
        articles={articles}
        mySavedArticles={mySavedArticles}
        updateMySavedArticles={updateMySavedArticles}
        keyword={keyword}
        isLoggedIn={isLoggedIn}
        handleOpenLoginPopup={handleOpenLoginPopup}
      />
      <About/>
    </main>
  );
}

export default Main;
