import React from 'react';
//import './style.css';  будет ошибка, если подключить стили
export const SsrTest = () => (
  <div className="ssr-test-page">Привет! Я - SSR! Но я еще маленький!</div>
);
