import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';

export const ErrorPage404 = (): JSX.Element => (
  <>
    <Title headingLevel={1} align="center">
      404
    </Title>
    <Title headingLevel={2} align="center">
      Не туда попали
      <br />
      :(
    </Title>
    <Link to="/game">
      <Button text="Назад к игре" type="button" className="center-horizontal" />
    </Link>
  </>
);
