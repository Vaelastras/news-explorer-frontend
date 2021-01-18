import {
  API_KEY, PROXY_URL, DAY_DECREMENT, COUNT_NEWS_SHOWED,
} from './constants';

export default function getArticlesFromServer(keyword) {
  // определим объект даты
  const worldTime = new Date();
  // переведем в ISO === "2020-12-28T08:31:12.577Z" и обрежем до дня
  const searchFrom = worldTime.toISOString().slice(0, 10);

  // установим в дату дату - 7 дней
  worldTime.setDate(worldTime.getDate() - DAY_DECREMENT);
  // переведем в ISO переведем в ISO === "2020-12-28T08:31:12.577Z" и обрежем до дня
  const searchAt = worldTime.toISOString().slice(0, 10);

  // TODO: вернуть 100 запросов
  return (
    fetch(`${PROXY_URL}?q=${keyword}&apiKey=${API_KEY}&from=${searchAt}&to=${searchFrom}&sortBy=publishedAt&pageSize=${COUNT_NEWS_SHOWED}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      }));
}
