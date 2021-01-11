const apiKey = '8c43c8fd4f0c449e95267fecb55fb71b';
const apiUrl = 'https://nomoreparties.co/news/v2/everything?';

export default function getArticlesFromServer(tag) {
  // определим объект даты
  const worldTime = new Date();
  // переведем в ISO === "2020-12-28T08:31:12.577Z" и обрежем до дня
  const searchFrom = worldTime.toISOString().slice(0, 10);

  // установим в дату дату - 7 дней
  worldTime.setDate(worldTime.getDate() - 7);
  // переведем в ISO переведем в ISO === "2020-12-28T08:31:12.577Z" и обрежем до дня
  const searchAt = worldTime.toISOString().slice(0, 10);

  return (
    fetch(`${apiUrl}q=${tag}&apiKey=${apiKey}&from=${searchAt}&to=${searchFrom}&sortBy=publishedAt&pageSize=100`, {
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
