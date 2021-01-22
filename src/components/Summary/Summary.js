import React, { useContext } from 'react';
import './summary.css';
import CurrentUserContext from '../../context/CurrentUserContext';

function Summary({ mySavedArticles }) {
  const currentUser = useContext(CurrentUserContext);

  // собираем массив уникальных ключевых слов
  const myArray = mySavedArticles.map((item) => item.keyword);
  const mySavedKeywords = [...new Set(myArray)];

  function handleKeywordFormatter(str) {
    if (!str) {
      return str;
    }
    return str[0].toUpperCase() + str.slice(1);
  }

  const firstKeyword = `${handleKeywordFormatter(mySavedKeywords[0])}`;
  const secondKeyword = `${handleKeywordFormatter(mySavedKeywords[1]) || ''}`;
  const thirdKeyword = `${handleKeywordFormatter(mySavedKeywords[2]) || ''}`;
  const keywords = `${mySavedKeywords.length >= 3 ? ` ${firstKeyword}, ${secondKeyword}, ${thirdKeyword}` : ` ${firstKeyword} и ${secondKeyword}`}`;
  const count = mySavedArticles.length;
  function handleTitleSaveNewsRewritter(foo) {
    if (foo === 0 && foo >= 5) { return 'ых статей'; }
    if (foo === 1) { return 'ая статья'; }
    if (foo > 1 && foo < 5) { return 'ых статьи'; }
    return 'ых статей';
  }

  function handleSubtitleRewritter(foo) {
    if (foo === 1) { return 'ому слову'; }
    return 'ым словам';
  }

  function handleTagsRewritter(foo) {
    if (foo - 3 <= 0) { return ''; }
    if (foo - 3 === 1) { return '-му другому'; }
    if (foo > 2) { return '-м другим'; }
    return '';
  }

  return (
    <section className='summary'>
      <div className="summary__wrapper">
        <p className="summary__subtitle">Сохраненные статьи</p>
        <h3 className="summary__title">{currentUser.name}, у вас {count > 0 ? count : 'ещё нет'} сохраненн{handleTitleSaveNewsRewritter(count)}</h3>
        {mySavedArticles.length > 0 && (
        <p className="summary__keyword">По ключев{handleSubtitleRewritter(mySavedKeywords.length)}:
          <span className="summary__keyword_type_bold"> {mySavedKeywords.length < 2 ? firstKeyword : keywords }</span>
          {mySavedKeywords.length > 2 && (
            <span className="summary__keyword_type_bold"> {
              (mySavedKeywords.length - 3) > 0
                ? `и ${mySavedKeywords.length - 3}`
                : ''}
              {handleTagsRewritter(mySavedKeywords.length)}
            </span>
          )
          }
        </p>)
        }
      </div>
    </section>

  );
}

export default Summary;
