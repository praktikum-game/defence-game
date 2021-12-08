import React from 'react';
import hobart from './viruses.png';
import './style.css';

export const SsrHomePage = () => (
  <div>
    <div>
      <img src={hobart} alt="Hobart" />
    </div>
    <h1 className="__ssr_test_class">Да здравствует SSR!</h1>
  </div>
);
