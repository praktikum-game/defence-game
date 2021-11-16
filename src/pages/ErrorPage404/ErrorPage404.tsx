import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';

import './errorPage404.css';

export const ErrorPage404 = () => (
  <div className="error-page-404">
    <Title headingLevel={1} align="center">
      404
    </Title>
    <Title headingLevel={2} align="center">
      Не туда попали
      <span>:(</span>
    </Title>
    <Link className="button__link" to="/game">
      <Button text="Назад к игре" view="error" type="button" className="center-horizontal" />
    </Link>
    <div className="error-page-404__lines"></div>
  </div>
);
