import React from 'react';
import './main.css';
import About from '../About/About';
import ArticlesList from '../ArticleList/ArticlesList';

function Main() {
  return (
    <main className='content'>
      <ArticlesList/>
      <About/>
    </main>
  );
}

export default Main;
