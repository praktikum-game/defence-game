import React from 'react';
import { Title } from '../../components/Title';

import './errorPage.css';

export const ErrorPage500 = () => (
  <div className="error-page-500">
    <Title headingLevel={1} align="center">
      500
    </Title>
    <Title headingLevel={2} align="center">
      Сервер не отвечает
      <span>:(</span>
    </Title>
    <Title headingLevel={3} align="center">
      Но мы уже работаем над этой проблемой
    </Title>
    <div className="error-page-500__lines"></div>
  </div>
);
