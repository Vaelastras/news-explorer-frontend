import { BASE_URL } from './constants';
import { handleValidityUrl } from './helpers';

// регистрация нового пользователя
export const createUser = (email, password, name) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, password }),
})
  .then((res) => {
    if (res.status !== 409) {
      return res.json();
    }
    return Promise.reject(res.status);
  })
  .catch((err) => Promise.reject(err));

// авторизация существующего пользователя
export const authorizeUser = (email, password) => fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
})
  // eslint-disable-next-line consistent-return
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  })
  // eslint-disable-next-line consistent-return
  .then((data) => {
    if (data.token) {
      localStorage.setItem('jwt', data.token);
      return data;
    }
  })
  // eslint-disable-next-line prefer-promise-reject-errors
  .catch((err) => Promise.reject(err));

// проверка токена
export const getUserContent = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return '';
  })
  .then((data) => data)
  .catch((err) => Promise.reject(new Error(`Error: ${err}`)));

/// получение серверных карточек
export const getAllArticles = () => fetch(
  `${BASE_URL}/articles`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  },
)
  .then((res) => res.json())
  .catch((err) => Promise.reject(new Error(`Error: ${err}`)));

// удаление серверной карточки
export const deleteArticle = (article) => fetch(
  `${BASE_URL}/articles/${article._id}`,
  {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  },
)
  .then((res) => res.json())
  .catch((err) => Promise.reject(new Error(`Error: ${err}`)));

// сохранить карту в своем апи
export const saveArticle = (article, keyword) => {
  const {
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage,
  } = article;

  return fetch(
    `${BASE_URL}/articles`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        keyword,
        title,
        text: description || title,
        date: publishedAt,
        source: source.name,
        link: url,
        image: handleValidityUrl(urlToImage) ? urlToImage : 'https://i.ibb.co/3SkSn1X/news-default.jpg', // все равно будет баг если с апи прилетает кривая ссылка по типу http://rg.ru/cgi-?http://.
      }),
    },
  )
    .then((res) => res.json())
    .catch((err) => Promise.reject(new Error(`Error: ${err}`)));
};
