import newsDefaultImage from '../images/news-default.jpg';

const baseAuthURL = `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3000'}`;

// регистрация нового пользователя
export const createUser = (email, password, name) => fetch(`${baseAuthURL}/signup`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, password }),
})
  .then((res) => {
    if (res.status !== 409) {
      return res.json();
    }
    return Promise.reject(res.status);
  });

// авторизация существующего пользователя
export const authorizeUser = (email, password) => fetch(`${baseAuthURL}/signin`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return '';
  })
  .then((data) => {
    if (data.token) {
      localStorage.setItem('jwt', data.token);
      return data;
    }
    return '';
  })
  .catch((err) => Promise.reject(err.message));

// проверка токена
export const getContent = (token) => fetch(`${baseAuthURL}/users/me`, {
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
  .catch((err) => Promise.reject(err.message));

/// получение серверных карточек
export const getAllArticles = () => fetch(
  `${baseAuthURL}/articles`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  },
)
  .then((res) => res.json())
  .catch((err) => Promise.reject(err.message));

// удаление серверной карточки
export const deleteArticle = (articleId) => fetch(
  `${baseAuthURL}/articles/${articleId}`,
  {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  },
)
  .then((res) => res.json())
  .catch((err) => Promise.reject(err.message));

// сохранить карту в своем апи
export const saveArticle = (article, keyword) => {
  const {
    owner,
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage,
  } = article;
  return fetch(
    `${baseAuthURL}/articles`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        owner,
        keyword,
        title,
        text: description || title,
        date: publishedAt,
        source: source.name,
        link: url,
        image: urlToImage || newsDefaultImage,
      }),
    },
  )
    .then((res) => res.json())
    .catch((err) => Promise.reject(err.message));
};
