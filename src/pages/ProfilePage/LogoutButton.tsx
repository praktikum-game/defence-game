import React from 'react';
import LogoutButtonSrc from './static/logout.svg';

export const LogoutButton = () => (
  <div className="logout-button header__logout-button">
    <button
      className="logout-button__button"
      type="button"
      onClick={() => {
        alert('click');
      }}
    >
      Выйти
      <img className="logout-button__icon" src={LogoutButtonSrc} alt="Назад" />
    </button>
  </div>
);
