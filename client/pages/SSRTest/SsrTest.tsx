import React from 'react';
import './style.css'; //будет ошибка, если подключить стили
import Image from '../../game/assets/images/doctor_image.png';
export const SsrTest = () => (
  <>
    <div>
      <p className="ssr-test-page">Привет! Я - SSR! Но я еще маленький</p>
      <img src={Image} />
    </div>
  </>
);
