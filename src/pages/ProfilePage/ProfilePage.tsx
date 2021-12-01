import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import { Header } from '../../components/Header';
import { PageContainer } from '../../components/PageContainer';
import { Footer } from '../../components/Footer';
import { Title } from '../../components/Title';
import { Form } from '../../components/Form';
import { Avatar } from '../../components/Avatar';
import { LogoutButton } from './LogoutButton';
import { InputNames } from '../../consts';
import { AppState } from '../../store';

import './profilePage.css';
import { useAuth } from '../../hooks/useAuth';

export const ProfilePage = () => {
  useAuth(false);
  const userData = useSelector((state: AppState) => state.user.data);

  return (
    <div className="profile-page">
      <Header backButton={true}>
        <Avatar />
        <LogoutButton />
      </Header>
      <PageContainer className="profile-page__page-container" size="m">
        <Title headingLevel={3} align="center">
          {userData?.display_name}
        </Title>
        <Form className="profile-page__form">
          <InputField
            name={InputNames.FIRST_NAME}
            value={userData?.first_name}
            type="text"
            label="Имя"
            disabled
          />
          <InputField
            name={InputNames.SECOND_NAME}
            value={userData?.second_name}
            type="text"
            label="Фамилия"
          />
          <InputField
            name={InputNames.EMAIL}
            value={userData?.email}
            type="E-mail"
            label="E-mail"
            disabled
          />
          <InputField
            name={InputNames.DISPLAY_NAME}
            value={userData?.display_name}
            type="text"
            label="Никнейм"
            disabled
          />
          <InputField
            name={InputNames.PHONE}
            value={userData?.phone}
            type="tel"
            label="Телефон"
            disabled
          />
          <InputField
            name={InputNames.PASSWORD}
            value="*******"
            type="password"
            label="Пароль"
            disabled
          />
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
};
