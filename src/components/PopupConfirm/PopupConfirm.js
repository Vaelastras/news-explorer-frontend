import React from 'react';
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import './popupConfirm.css';

function PopupConfirm (props) {
  const {isOpen, onClose} = props;

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <PopupWithForm
      isOpen = {isOpen}
      onClose = {onClose}
      onSubmit={handleSubmit}
      name="register"
      title="Регистрация"
    />
  )
}

export default PopupConfirm;
