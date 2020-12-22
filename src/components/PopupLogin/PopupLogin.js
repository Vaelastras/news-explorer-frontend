import React from 'react';
import './popupLogin.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Validator from '../../utils/Validator';

function PopupLogin(props) {
  const {
    values,
    handleChange,
    errors,
    isValid,
  } = Validator();
  const {
    isOpen,
    onClose,
    onSwitchPopup,
  } = props;

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSwitchPopup={onSwitchPopup}
      onSubmit={handleSubmit}
      name='login'
      title='Вход'
      text='или '
      buttonDescription='Зарегистрироваться'>
        <label className="popup__label">Email</label>
        <input
          value={values.email || ''}
          onChange={handleChange}
          className="popup__input popup__input_type_email"
          id="email"
          type="email"
          name="email"
          placeholder="Введите почту"
          minLength="5"
          maxLength="30"
          required
        />
        <span id="email-error-login" className="popup__error" >{errors.email || ''}</span>

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
        <span id="password-error-login" className="popup__input-error" >{errors.password || ''}</span>

        <span id="main-error-login" className="popup__error popup__error_type_login">ТУТ ДОЛЖЕН БЫТЬ КАКОЙ ТО ТЕКСТ ОШИБКИ LOGIN!</span>

        <button className={`popup__submit ${isValid ? 'popup__submit_type_active' : ''}`} type="submit" disabled={!isValid}>Зарегистрироваться</button>
    </PopupWithForm>
  );
}

export default PopupLogin;
