import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../store/user/actions/action-creators';
import LogoutButtonSrc from './static/logout.svg';

export const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(userLogout());
  }, [dispatch]);

  return (
    <div className="logout-button header__logout-button">
      <button className="logout-button__button" type="button" onClick={handleLogout}>
        Выйти
        <img className="logout-button__icon" src={LogoutButtonSrc} alt="Назад" />
      </button>
    </div>
  );
};