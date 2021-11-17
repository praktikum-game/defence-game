import React, { useCallback } from 'react';
import LogoutButtonSrc from './static/logout.svg';

export const LogoutButton = () => {
  const handleButtonClick = useCallback(() => {
    alert('Clicked event');
  }, []);

  return (
    <div className="logout-button header__logout-button">
      <button className="logout-button__button" type="button" onClick={handleButtonClick}>
        Выйти
        <img className="logout-button__icon" src={LogoutButtonSrc} alt="Назад" />
      </button>
    </div>
  );
};
