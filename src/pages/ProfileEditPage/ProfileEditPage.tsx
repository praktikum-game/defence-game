import React, { useEffect, useState, useCallback } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import { Header } from '../../components/Header';
import { PageContainer } from '../../components/PageContainer';
import { Form } from '../../components/Form';
import EditIcon from './static/edit.svg';
import { Avatar } from '../../components/Avatar';
import { Footer } from '../../components/Footer';
import { InputNames } from '../../consts';
import { store } from '../../store';
import { usersController } from '../../controllers';
import {
  loginValidator,
  emailValidator,
  nameValidator,
  phoneValidator,
  ValidationResult,
} from '../../utilities/validators';
import { inputValueUpdaterFactory } from '../utilities';

import './profileEditPage.css';

export const ProfileEditPage = () => {
  const navigate = useNavigate();
  const user =
    store.user === null
      ? { login: '', phone: '', first_name: '', second_name: '', display_name: '', email: '' }
      : store.user;

  const [editResult, setEditResult] = useState(false);

  const [loginValue, setLoginValue] = useState(user.login);
  const [loginValidationResult, setLoginValidationResult] = useState<ValidationResult>({
    message: '',
    valid: true,
  });

  const [phoneValue, setPhoneValue] = useState(user.phone);
  const [phoneValidationResult, setPhoneValidationResult] = useState<ValidationResult>({
    message: '',
    valid: true,
  });

  const [firstNameValue, setFirstNameValue] = useState(user.first_name);
  const [firstNameValidationResult, setFirstNameValidationResult] = useState<ValidationResult>({
    message: '',
    valid: true,
  });

  const [secondNameValue, setSecondNameValue] = useState(user.second_name);
  const [secondNameValidationResult, setSecondNameValidationResult] = useState<ValidationResult>({
    message: '',
    valid: true,
  });

  const [displayNameValue, setDisplayNameValue] = useState(user.display_name);
  const [displayNameValidationResult, setDisplayNameValidationResult] = useState<ValidationResult>({
    message: '',
    valid: true,
  });

  const [emailValue, setEmailValue] = useState(user.email);
  const [emailValidationResult, setEmailValidationResult] = useState<ValidationResult>({
    message: '',
    valid: true,
  });

  useEffect(() => {
    if (editResult) {
      navigate('/profile-edit', { replace: true });
    }
  }, [editResult, navigate]);

  const updateProfileCallback = useCallback(
    async (data: FormData) => usersController.updateProfile(data),
    [],
  );

  if (store.user === null) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile-edit-page">
      <Header backButton={true}>
        <Avatar />
      </Header>
      <PageContainer className="profile-edit-page__page-container" size="m">
        <Form
          className="profile-edit-page__form"
          validationResults={[
            loginValidationResult,
            emailValidationResult,
            phoneValidationResult,
            firstNameValidationResult,
            secondNameValidationResult,
            displayNameValidationResult,
          ]}
          controllerCallback={updateProfileCallback}
          setSubmitResult={setEditResult}
        >
          <InputField
            name={InputNames.LOGIN}
            value={loginValue}
            label="Логин"
            errorText={loginValidationResult.message}
            isValid={loginValidationResult.valid}
            valueChangeCallback={inputValueUpdaterFactory(
              loginValidator,
              setLoginValidationResult,
              setLoginValue,
            )}
          />
          <InputField
            name={InputNames.FIRST_NAME}
            value={firstNameValue}
            type="text"
            label="Имя"
            errorText={firstNameValidationResult.message}
            isValid={loginValidationResult.valid}
            valueChangeCallback={inputValueUpdaterFactory(
              nameValidator,
              setFirstNameValidationResult,
              setFirstNameValue,
            )}
          />
          <InputField
            name={InputNames.EMAIL}
            value={emailValue}
            type="E-mail"
            label="E-mail"
            errorText={emailValidationResult.message}
            isValid={loginValidationResult.valid}
            valueChangeCallback={inputValueUpdaterFactory(
              emailValidator,
              setEmailValidationResult,
              setEmailValue,
            )}
          />
          <InputField
            name={InputNames.SECOND_NAME}
            value={secondNameValue}
            type="text"
            label="Фамилия"
            errorText={secondNameValidationResult.message}
            isValid={loginValidationResult.valid}
            valueChangeCallback={inputValueUpdaterFactory(
              nameValidator,
              setSecondNameValidationResult,
              setSecondNameValue,
            )}
          />
          <InputField
            name={InputNames.DISPLAY_NAME}
            value={displayNameValue}
            type="text"
            label="Никнейм"
            errorText={displayNameValidationResult.message}
            isValid={loginValidationResult.valid}
            valueChangeCallback={inputValueUpdaterFactory(
              nameValidator,
              setDisplayNameValidationResult,
              setDisplayNameValue,
            )}
          />
          <InputField
            name={InputNames.PHONE}
            value={phoneValue}
            type="tel"
            label="Телефон"
            errorText={phoneValidationResult.message}
            isValid={loginValidationResult.valid}
            valueChangeCallback={inputValueUpdaterFactory(
              phoneValidator,
              setPhoneValidationResult,
              setPhoneValue,
            )}
          />
          <div className="password-edit">
            <InputField
              name={InputNames.PASSWORD}
              value="********"
              type="password"
              label="Пароль"
              disabled
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
              disabled={
                !(
                  loginValidationResult.valid &&
                  emailValidationResult.valid &&
                  firstNameValidationResult.valid &&
                  secondNameValidationResult.valid &&
                  displayNameValidationResult.valid &&
                  phoneValidationResult.valid
                )
              }
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
};
