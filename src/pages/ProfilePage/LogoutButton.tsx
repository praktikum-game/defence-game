import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authController } from '../../controllers';
import LogoutButtonSrc from './static/logout.svg';

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    authController.logout().then((result) => {
      if (result) {
        navigate('/');
      }
    });
  }, [navigate]);

  return (
    <div className="logout-button header__logout-button">
      <button className="logout-button__button" type="button" onClick={handleLogout}>
        Выйти
        <img className="logout-button__icon" src={LogoutButtonSrc} alt="Назад" />
      </button>
    </div>
  );
};
