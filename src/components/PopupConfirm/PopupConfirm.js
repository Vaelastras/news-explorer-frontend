import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './popupConfirm.css';

function PopupConfirm(props) {
  const { isOpen, onClose } = props;

  return (
    <PopupWithForm
      isOpen = {isOpen}
      onClose = {onClose}
      name="register"
      title="Регистрация"
    />
  );
}

export default PopupConfirm;
