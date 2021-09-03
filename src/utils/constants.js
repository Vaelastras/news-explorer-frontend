//  const BASE_URL = `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3000'}`;
const BASE_URL = 'https://news-explorer-project.herokuapp.com';
const API_KEY = '8c43c8fd4f0c449e95267fecb55fb71b';
const PROXY_URL = 'https://nomoreparties.co/news/v2/everything';
const CARDS_TO_SHOW = 3;
const DAY_DECREMENT = 7;
const COUNT_NEWS_SHOWED = 20;
const NEWS_DEFAULT_IMG = 'https://i.ibb.co/3SkSn1X/news-default.jpg';

module.exports = {
  BASE_URL,
  API_KEY,
  PROXY_URL,
  CARDS_TO_SHOW,
  DAY_DECREMENT,
  COUNT_NEWS_SHOWED,
  NEWS_DEFAULT_IMG,
};
