import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import { Header } from '../../components/Header';
import { PageContainer } from '../../components/PageContainer';
import { Form } from '../../components/Form';
import {
  email,
  required,
  validate,
  longerThan,
  shorterThan,
  ValidationResult,
} from '../../utilities/validators';

import './profileEditPage.css';

import EditIcon from './static/edit.svg';
import { Avatar } from '../../components/Avatar';

const nameInputValidators = [
  { checkFunction: required(), message: 'Это обязательное поле' },
  { checkFunction: longerThan(2), message: 'Поле должно быть больше 2 символов' },
  { checkFunction: shorterThan(12), message: 'Поле должно быть меньше 12 символов' },
];

const emailInputValidators = [
  { checkFunction: required(), message: 'Это обязательное поле' },
  { checkFunction: email(), message: 'Это не email' },
];

const secondNameInputValidators = [
  { checkFunction: required(), message: 'Это обязательное поле' },
  { checkFunction: longerThan(2), message: 'Поле должно быть больше 2 символов' },
  { checkFunction: shorterThan(12), message: 'Поле должно быть меньше 12 символов' },
];

export const ProfileEditPage = () => {
  const [nameInputValue, setNameInputValue] = useState<string>('Екатерина');
  const [emailInputValue, setEmailInputValue] = useState<string>('mail@mail.ru');
  const [secondNameInputValue, setSecondNameInputValue] = useState<string>('Семёнова');

  const [nameInputError, setNameInputError] = useState<ValidationResult>({
    valid: true,
    message: null,
  });
  const [emailInputError, setEmailInputError] = useState<ValidationResult>({
    valid: true,
    message: null,
  });
  const [secondNameInputError, setSecondNameInputError] = useState<ValidationResult>({
    valid: true,
    message: null,
  });

  const checkNameInputField = (value: string) => {
    const validationResult = validate(nameInputValidators, value);
    setNameInputError(validationResult);
  };

  const checkEmailInputField = (value: string) => {
    const validationResult = validate(emailInputValidators, value);
    setEmailInputError(validationResult);
  };

  const checkSecondNameInputField = (value: string) => {
    const validationResult = validate(secondNameInputValidators, value);
    setSecondNameInputError(validationResult);
  };

  const handleNameInput = useCallback((value: string) => {
    setNameInputValue(value);
  }, []);

  const handleEmailInput = useCallback((value: string) => {
    setEmailInputValue(value);
  }, []);

  const handleSecondNameInput = useCallback((value: string) => {
    setSecondNameInputValue(value);
  }, []);

  useEffect(() => {
    checkNameInputField(nameInputValue);
  }, [nameInputValue]);

  useEffect(() => {
    checkEmailInputField(emailInputValue);
  }, [emailInputValue]);

  useEffect(() => {
    checkSecondNameInputField(secondNameInputValue);
  }, [secondNameInputValue]);

  return (
    <div className="profile-edit-page">
      <Header backButton={true}>
        <Avatar />
        <div />
      </Header>
      <PageContainer className="profile-edit-page__page-container" size="m">
        <Form className="profile-edit-page__form">
          <InputField
            id="first_name"
            value={nameInputValue}
            type="text"
            label="Имя"
            valueChangeCallback={handleNameInput}
            isValid={nameInputError.valid}
            errorText={nameInputError.message}
          />
          <InputField
            id="email"
            value={emailInputValue}
            type="E-mail"
            label="E-mail"
            valueChangeCallback={handleEmailInput}
            isValid={emailInputError.valid}
            errorText={emailInputError.message}
          />
          <InputField
            id="second_name"
            value={secondNameInputValue}
            type="text"
            label="Фамилия"
            valueChangeCallback={handleSecondNameInput}
            isValid={secondNameInputError.valid}
            errorText={secondNameInputError.message}
          />
          <InputField
            id="display_name"
            value="simon"
            type="text"
            label="Никнейм"
            errorText="Текст ошибки"
          />
          <InputField
            id="phone"
            value="+7 (916) 473-65-83"
            type="tel"
            label="Телефон"
            errorText="Текст ошибки"
          />
          <div className="password-edit">
            <InputField
              id="password"
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
          <div className="profile-edit-page__footer">
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
          </div>
        </Form>
      </PageContainer>
    </div>
  );
};
