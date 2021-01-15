import React, { useContext } from 'react';
import './summary.css';
import CurrentUserContext from '../../context/CurrentUserContext';

function Summary() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className='summary'>
      <div className="summary__wrapper">
        <p className="summary__subtitle">Сохраненные статьи</p>
        <h3 className="summary__title">{currentUser.name}, у вас 5 сохраненных статей</h3>
        <p className="summary__keyword">По ключевым словам:
          <span className="summary__keyword_type_bold"> Природа, Тайга</span> и
          <span className="summary__keyword_type_bold"> 2-м другим</span>
        </p>
      </div>
    </section>

  );
}

export default Summary;
