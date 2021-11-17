import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import { Header } from '../../components/Header';
import { PageContainer } from '../../components/PageContainer';
import { Form } from '../../components/Form';
import EditIcon from './static/edit.svg';
import { Avatar } from '../../components/Avatar';
import { Footer } from '../../components/Footer';
import { InputNames } from '../../consts';

import './profileEditPage.css';

export const ProfileEditPage = () => (
  <div className="profile-edit-page">
    <Header backButton={true}>
      <Avatar />
    </Header>
    <PageContainer className="profile-edit-page__page-container" size="m">
      <Form className="profile-edit-page__form">
        <InputField
          name={InputNames.FIRST_NAME}
          value="Екатерина"
          type="text"
          label="Имя"
          errorText="Текст ошибки"
        />
        <InputField
          name={InputNames.EMAIL}
          value="mail@mail.ru"
          type="E-mail"
          label="E-mail"
          errorText="Текст ошибки"
        />
        <InputField
          name={InputNames.SECOND_NAME}
          value="Симонова"
          type="text"
          label="Фамилия"
          errorText="Текст ошибки"
        />
        <InputField
          name={InputNames.DISPLAY_NAME}
          value="simon"
          type="text"
          label="Никнейм"
          errorText="Текст ошибки"
        />
        <InputField
          name={InputNames.PHONE}
          value="+7 (916) 458-25-85"
          type="tel"
          label="Телефон"
          errorText="Текст ошибки"
        />
        <div className="password-edit">
          <InputField
            name={InputNames.PASSWORD}
            value="*********"
            type="password"
            label="Пароль"
            errorText="Текст ошибки"
          />
          <div className="password-edit__icon">
            <Link to="/password-edit">
              <img src={EditIcon} alt="Изменить пароль" />
            </Link>
          </div>
        </div>
        <Footer className="profile-edit-page__footer">
          <Button
            type="submit"
            className="profile-edit-page__button"
            text="Сохранить"
            view="primary"
          ></Button>
          <Link to="/profile">
            <Button
              type="button"
              className="profile-edit-page__button"
              text="Отменить"
              view="secondary"
            ></Button>
          </Link>
        </Footer>
      </Form>
    </PageContainer>
  </div>
);
