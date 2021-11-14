import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButtonSrc from './static/arrow-left.svg';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="back-button header__back-button">
      <img src={BackButtonSrc} alt="Назад" onClick={() => navigate(-1)} />
    </div>
  );
};
