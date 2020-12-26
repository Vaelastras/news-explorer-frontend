import React from 'react';
import './popupWithForm.css';
import { Link } from 'react-router-dom';

function PopupWithForm(props) {
  const {
    isOpen,
    name,
    onSubmit,
    title,
    text,
    children,
    onClose,
    onSwitchPopup,
    buttonDescription,
  } = props;

  return (
    <div className={(isOpen ? `popup popup_type_${name} popup_active` : `popup popup_type_${name}`)}>
      <div className="popup__container">
        <form className="popup__form" action="#" name={name} onSubmit={onSubmit} noValidate>
          <h2 className="popup__title">{title}</h2>
          {children}
          <p className="popup__text">{text}
            <Link to='/' className="popup__switcher" onClick={onSwitchPopup}>{buttonDescription}</Link>
          </p>
        </form>
        <button className="popup__close" type="button" onClick={onClose} />
      </div>
    </div>
  );
}

export default PopupWithForm;
