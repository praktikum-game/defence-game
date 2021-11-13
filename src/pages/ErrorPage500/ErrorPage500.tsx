import React from 'react';
import { Title } from '../../components/Title';

export const ErrorPage500 = (): JSX.Element => (
  <>
    <Title headingLevel={1} align="center">
      500
    </Title>
    <Title headingLevel={2} align="center">
      Сервер не отвечает
      <br />
      :(
      <br />
    </Title>
    <Title headingLevel={3} align="center">
      Но мы уже работаем над этой проблемой
    </Title>
  </>
);
