import React from 'react';
import './about.css';
import avatar from '../../images/avatar/avatar.jpg';

function About() {
  return (
    <section className="about">
      <img className="about__avatar" src={avatar} alt="Фото автора"/>
      <div className="about__wrapper">
        <h2 className="about__title">Об авторе</h2>
          <p className="about__paragraph">Это блок с описанием автора проекта.
          Здесь следует указать, как вас зовут, чем вы занимаетесь, какими технологиями разработки владеете.</p>
          <p className="about__paragraph">Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь потенциальным заказчикам.</p>
      </div>
    </section>
  );
}

export default About;
