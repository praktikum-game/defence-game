import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButtonSrc from './static/arrow-left.svg';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="header__back-button" onClick={() => navigate(-1)}>
      <img src={BackButtonSrc} alt="Назад" />
    </button>
  );
};
