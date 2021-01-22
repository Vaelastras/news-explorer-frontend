import React from 'react';
import './about.css';
import myAvatar from '../../images/avatar/avatar.jpg';

function About() {
  return (
    <section className="about">
      <img className="about__avatar" src={myAvatar} alt="Фото автора"/>
      <div className="about__wrapper">
        <h2 className="about__title">Об авторе</h2>
          <p className="about__paragraph">Всем пламенный привет!</p>
          <p className="about__paragraph">Меня зовут Алексей Белов, я начинающий Front-end разработчик.</p>
          <p className="about__paragraph">Мне 33 года, живу в Москве.</p>
          <p className="about__paragraph">Очень люблю путешествовать, особенно по городам Золотого Кольца России 🪐🇷🇺</p>
          <p className="about__paragraph">Тут должен быть какой-то текст про меня</p>
      </div>
    </section>
  );
}

export default About;
