import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './popupConfirm.css';

export default function PopupConfirm(props) {
  const { isOpen, onClose, onLogin } = props;

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="register"
      title="Пользователь успешно зарегистрирован"
    >
    <span onClick={onLogin} type='button' className="popup__switcher popup__switcher_confirm">Войти</span>
    </PopupWithForm>
  );
}
