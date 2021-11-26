import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
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
import { bindArgsFromN } from '../../utilities/utilities';
import { InputNames } from '../../consts';
import { authController } from '../../controllers';
import { store } from '../../store';

import './registerPage.css';
import { useFormInput } from '../../components/Form/hooks/useFormInput';

export const RegisterPage = (): JSX.Element => {
  const navigate = useNavigate();

  const [registerResult, setRegisterResult] = useState(false);

  const [{ value: loginValue, validationResult: loginValidationResult }, setLoginValue] =
    useFormInput(loginValidator);

  const [{ value: phoneValue, validationResult: phoneValidationResult }, setPhoneValue] =
    useFormInput(phoneValidator);

  const [
    { value: firstNameValue, validationResult: firstNameValidationResult },
    setFirstNameValue,
  ] = useFormInput(nameValidator);

  const [
    { value: secondNameValue, validationResult: secondNameValidationResult },
    setSecondNameValue,
  ] = useFormInput(nameValidator);

  const [{ value: emailValue, validationResult: emailValidationResult }, setEmailValue] =
    useFormInput(emailValidator);

  const [{ value: passwordValue, validationResult: passwordValidationResult }, setPasswordValue] =
    useFormInput(passwordValidator);

  const [
    { value: repeatPasswordValue, validationResult: repeatPasswordValidationResult },
    setRepeatPasswordValue,
  ] = useFormInput(passwordValidator);

  const resetInputValues = useCallback(() => {
    setLoginValue('');
    setPhoneValue('');
    setFirstNameValue('');
    setSecondNameValue('');
    setEmailValue('');
    setPasswordValue('');
    setRepeatPasswordValue('');
  }, [
    setLoginValue,
    setPhoneValue,
    setFirstNameValue,
    setSecondNameValue,
    setEmailValue,
    setPasswordValue,
    setRepeatPasswordValue,
  ]);

  useEffect(() => {
    if (registerResult) {
      navigate('/', { replace: true });
    }
  }, [registerResult, navigate]);

  const registerCallback = useCallback(async (data: FormData) => authController.register(data), []);

  if (store.user !== null) {
    return <Navigate to="/" />;
  }

  return (
    <div className="register-page">
      <Header size="s">
        <Title headingLevel={2} align="center">
          Регистрация
        </Title>
      </Header>
      <PageContainer size="s">
        <Form
          className="register-page__form"
          validationResults={[
            loginValidationResult,
            emailValidationResult,
            phoneValidationResult,
            firstNameValidationResult,
            secondNameValidationResult,
            passwordValidationResult,
            repeatPasswordValidationResult,
          ]}
          controllerCallback={registerCallback}
          resetValuesCallback={resetInputValues}
          setSubmitResult={setRegisterResult}
        >
          <InputField
            view="labeled"
            value={loginValue}
            name={InputNames.LOGIN}
            label="Логин"
            errorText={loginValidationResult.message}
            isValid={loginValidationResult.valid}
            valueChangeCallback={setLoginValue}
          />
          <InputField
            view="labeled"
            value={phoneValue}
            name="phone"
            label="Телефон"
            errorText={phoneValidationResult.message}
            isValid={phoneValidationResult.valid}
            valueChangeCallback={setPhoneValue}
          />
          <InputField
            view="labeled"
            value={firstNameValue}
            name="first_name"
            label="Имя"
            errorText={firstNameValidationResult.message}
            isValid={firstNameValidationResult.valid}
            valueChangeCallback={setFirstNameValue}
          />
          <InputField
            view="labeled"
            value={secondNameValue}
            name="second_name"
            label="Фамилия"
            errorText={secondNameValidationResult.message}
            isValid={secondNameValidationResult.valid}
            valueChangeCallback={setSecondNameValue}
          />
          <InputField
            view="labeled"
            value={emailValue}
            name={InputNames.EMAIL}
            label="Email"
            type="email"
            errorText={emailValidationResult.message}
            isValid={emailValidationResult.valid}
            valueChangeCallback={setEmailValue}
          />
          <InputField
            view="labeled"
            value={passwordValue}
            name={InputNames.PASSWORD}
            label="Пароль"
            type="password"
            errorText={passwordValidationResult.message}
            isValid={passwordValidationResult.valid}
            valueChangeCallback={setPasswordValue}
          />
          <InputField
            view="labeled"
            value={repeatPasswordValue}
            name={InputNames.REPEAT_PASSWORD}
            label="Пароль (еще раз)"
            type="password"
            errorText={repeatPasswordValidationResult.message}
            isValid={repeatPasswordValidationResult.valid}
            valueChangeCallback={bindArgsFromN(setRepeatPasswordValue, 2, passwordValue)}
          />
          <Footer className="register-page__footer">
            <Button
              text="Зарегистрироваться"
              type="submit"
              disabled={
                !(
                  loginValidationResult.valid &&
                  emailValidationResult.valid &&
                  passwordValidationResult.valid &&
                  repeatPasswordValidationResult.valid
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
