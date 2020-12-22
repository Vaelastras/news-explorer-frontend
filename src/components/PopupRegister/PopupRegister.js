import React from 'react';
import './popupRegister.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Validator from '../../utils/Validator';

function PopupRegister(props) {
  const {
    values, handleChange, errors, isValid,
  } = Validator();
  const { isOpen, onClose, onSwitchPopup } = props;

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSwitchPopup={onSwitchPopup}
      onSubmit={handleSubmit}
      name='register'
      title='Регистрация'
      text='или '
      buttonDescription='Войти'
    >
      <label className="popup__label">Email</label>
      <input
        value={values.email || ''}
        onChange={handleChange}
        id="email"
        className="popup__input popup__input_type_email"
        type="email"
        name="email"
        placeholder="Введите почту"
        minLength="5"
        maxLength="30"
        required
      />
      <span id="email-register-error" className="popup__error" >{errors.email || ''}</span>

      <label className="popup__label">Пароль</label>
      <input
        value={values.password || ''}
        onChange={handleChange}
        className="popup__input popup__input_type_password"
        id="password"
        type="password"
        name="password"
        placeholder="Введите пароль"
        minLength="5"
        maxLength="30"
        required
      />
      <span id="password-error-register" className="popup__error" >{errors.password || ''}</span>

      <label className="popup__label">Имя</label>
      <input
        value={values.name || ''}
        onChange={handleChange}
        className="popup__input popup__input_type_name"
        id="name"
        type="text"
        name="name"
        placeholder="Введите своё имя"
        minLength="2"
        maxLength="30"
        required
      />
      <span id="name-error-register" className="popup__error"> {errors.name || ''} </span>
      <span id="main-error-register" className="popup__error popup__error_type_register"> ТУТ ДОЛЖЕН БЫТЬ КАКОЙ ТО ТЕКСТ ОШИБКИ REGISTER!</span>
      <button className={`popup__submit ${isValid ? 'popup__submit_type_active' : ''}`} type="submit" disabled={!isValid}>Войти</button>
    </PopupWithForm>
  );
}

export default PopupRegister;
