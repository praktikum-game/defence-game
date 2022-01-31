import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Footer } from '../../components/Footer';
import { PageContainer } from '../../components/PageContainer';
import { Header } from '../../components/Header';
import { Form } from '../../components/Form';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import {
  loginValidator,
  passwordValidator,
  emailValidator,
  nameValidator,
  phoneValidator,
} from '../../utilities/validators';
import { bindArgsFromN } from '../../utilities';
import { InputNames } from '../../consts';
import { useFormInput } from '../../hooks/useFormInput/useFormInput';
import { RegisterRequest } from '../../api/auth';
import { userRegister } from '../../store/user/actions/action-creators';
import { showNotificationWithTimeout } from 'store/notification/actions/action-creators';

import './registerPage.css';

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const [{ value: loginValue, messages: loginErrors }, setLoginValue] =
    useFormInput(loginValidator);

  const [{ value: phoneValue, messages: phoneErrors }, setPhoneValue] =
    useFormInput(phoneValidator);

  const [{ value: firstNameValue, messages: firstNameErrors }, setFirstNameValue] =
    useFormInput(nameValidator);

  const [{ value: secondNameValue, messages: secondNameErrors }, setSecondNameValue] =
    useFormInput(nameValidator);

  const [{ value: emailValue, messages: emailErrors }, setEmailValue] =
    useFormInput(emailValidator);

  const [{ value: passwordValue, messages: passwordErrors }, setPasswordValue] =
    useFormInput(passwordValidator);

  const [{ value: repeatPasswordValue, messages: repeatPasswordErrors }, setRepeatPasswordValue] =
    useFormInput(passwordValidator);

  const handleUserRegisterFormSubmit = useCallback(
    async (data: FormData) => {
      const registerData: RegisterRequest = {
        first_name: String(data.get('first_name')),
        second_name: String(data.get('second_name')),
        login: String(data.get('login')),
        password: String(data.get('password')),
        email: String(data.get('email')),
        phone: String(data.get('phone')),
      };

      try {
        dispatch(userRegister(registerData));

        setLoginValue('');
        setPhoneValue('');
        setFirstNameValue('');
        setSecondNameValue('');
        setEmailValue('');
        setPasswordValue('');
        setRepeatPasswordValue('');
      } catch (e: unknown) {
        dispatch(
          showNotificationWithTimeout({
            text: 'Проверьте правильность заполнения полей',
            title: 'Не удалось',
            type: 'warning',
          }),
        );
      }
    },
    [
      dispatch,
      setLoginValue,
      setPhoneValue,
      setFirstNameValue,
      setEmailValue,
      setRepeatPasswordValue,
      setPasswordValue,
      setSecondNameValue,
    ],
  );

  return (
    <div className="register-page">
      <Header size="s">
        <Title headingLevel={2} align="center">
          Регистрация
        </Title>
      </Header>
      <PageContainer size="s">
        <Form className="register-page__form" onFormSubmit={handleUserRegisterFormSubmit}>
          <InputField
            view="labeled"
            value={loginValue}
            name={InputNames.LOGIN}
            label="Логин"
            type="text"
            errors={loginErrors}
            onTextChange={setLoginValue}
          />
          <InputField
            view="labeled"
            value={phoneValue}
            name="phone"
            type="tel"
            label="Телефон"
            errors={phoneErrors}
            onTextChange={setPhoneValue}
          />
          <InputField
            view="labeled"
            value={firstNameValue}
            name="first_name"
            label="Имя"
            type="text"
            errors={firstNameErrors}
            onTextChange={setFirstNameValue}
          />
          <InputField
            view="labeled"
            value={secondNameValue}
            name="second_name"
            label="Фамилия"
            errors={secondNameErrors}
            type="text"
            onTextChange={setSecondNameValue}
          />
          <InputField
            view="labeled"
            value={emailValue}
            name={InputNames.EMAIL}
            label="Email"
            type="email"
            errors={emailErrors}
            onTextChange={setEmailValue}
          />
          <InputField
            view="labeled"
            value={passwordValue}
            name={InputNames.PASSWORD}
            label="Пароль"
            type="password"
            errors={passwordErrors}
            onTextChange={setPasswordValue}
          />
          <InputField
            view="labeled"
            value={repeatPasswordValue}
            name={InputNames.REPEAT_PASSWORD}
            label="Пароль (еще раз)"
            type="password"
            errors={repeatPasswordErrors}
            onTextChange={bindArgsFromN(setRepeatPasswordValue, 2, passwordValue)}
          />
          <Footer className="register-page__footer">
            <Button
              text="Зарегистрироваться"
              type="submit"
              disabled={
                !(
                  loginErrors.length < 1 &&
                  loginValue.length > 0 &&
                  emailErrors.length < 1 &&
                  emailValue.length > 0 &&
                  phoneErrors.length < 1 &&
                  phoneValue.length > 0 &&
                  firstNameErrors.length < 1 &&
                  firstNameValue.length > 0 &&
                  secondNameErrors.length < 1 &&
                  secondNameValue.length > 0 &&
                  passwordErrors.length < 1 &&
                  passwordValue.length > 0 &&
                  repeatPasswordErrors.length < 1 &&
                  repeatPasswordValue.length > 0
                )
              }
              className="center-horizontal"
            />
            <Link className="footer__link" to="/login">
              Уже зарегистрированы?
            </Link>
          </Footer>
        </Form>
      </PageContainer>
    </div>
  );
};
