import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import { Header } from '../../components/Header';
import { PageContainer } from '../../components/PageContainer';
import { Title } from '../../components/Title';
import { Form } from '../../components/Form';

import './profilePage.css';

export const ProfilePage = () => (
  <div className="profile-page">
    <Header>
      <div>1</div>
    </Header>
    <PageContainer size="m">
      <Title headingLevel={3} align="center">
        Иван
      </Title>
      <Form className="profile-page__form">
        <InputField id="first_name" value="Екатерина" type="text" label="Имя" disabled />
        <InputField id="second_name" value="Симонова" type="text" label="Фамилия" />
        <InputField id="email" value="mail@mail.ru" type="E-mail" label="E-mail" disabled />
        <InputField id="display_name" value="simon" type="text" label="Никнейм" />
        <InputField id="phone" value="+7 (916) 473-65-83" type="tel" label="Телефон" />
        <InputField id="password" value="***********" type="password" label="Пароль" />
        <div className="profile-page__footer">
          <Link to="/profile-edit">
            <Button
              type="button"
              className="profile-page__button"
              text="Редактировать"
              view="secondary"
            ></Button>
          </Link>
        </div>
      </Form>
    </PageContainer>
  </div>
);
