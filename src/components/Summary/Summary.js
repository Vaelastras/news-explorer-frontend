import React from 'react';
import './summary.css';

function Summary() {
  return (
    <section className='summary'>
      <div className="summary__wrapper">
        <p className="summary__subtitle">Сохраненные статьи</p>
        <h3 className="summary__title">Вася, у вас 5 сохраненных статей</h3>
        <p className="summary__keyword">По ключевым словам:
          <span className="summary__keyword_type_bold"> Природа, Тайга</span> и
          <span className="summary__keyword_type_bold"> 2-м другим</span>
        </p>
      </div>
    </section>

  );
}

export default Summary;
