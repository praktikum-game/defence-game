import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import { Header } from '../../components/Header';
import { PageContainer } from '../../components/PageContainer';
import { Footer } from '../../components/Footer';
import { Title } from '../../components/Title';
import { Form } from '../../components/Form';
import { Avatar } from '../../components/Avatar';
import { LogoutButton } from './LogoutButton';
import { InputNames } from '../utilities';
import './profilePage.css';
import { LogoutButton } from './LogoutButton';

export const ProfilePage = () => (
  <div className="profile-page">
    <Header backButton={true}>
      <Avatar />
      <LogoutButton />
    </Header>
    <PageContainer className="profile-page__page-container" size="m">
      <Title headingLevel={3} align="center">
        Иван
      </Title>
      <Form className="profile-page__form">
        <InputField
          name={InputNames.FIRST_NAME}
          value="Екатерина"
          type="text"
          label="Имя"
          disabled
        />
        <InputField name={InputNames.SECOND_NAME} value="Симонова" type="text" label="Фамилия" />
        <InputField
          name={InputNames.EMAIL}
          value="mail@mail.ru"
          type="E-mail"
          label="E-mail"
          disabled
        />
        <InputField name={InputNames.DISPLAY_NAME} value="simon" type="text" label="Никнейм" />
        <InputField name={InputNames.PHONE} value="+7 (916) 473-65-83" type="tel" label="Телефон" />
        <InputField name={InputNames.PASSWORD} value="***********" type="password" label="Пароль" />
        <Footer className="profile-page__footer">
          <Link to="/profile-edit">
            <Button
              type="button"
              className="profile-page__button"
              text="Редактировать"
              view="secondary"
            ></Button>
          </Link>
        </Footer>
      </Form>
    </PageContainer>
  </div>
);
