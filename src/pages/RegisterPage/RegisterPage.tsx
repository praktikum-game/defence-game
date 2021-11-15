import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  ValidationResult,
} from '../../utilities/validators';
import { bindArgsFromN } from '../../utilities/utilities';
import { inputValueUpdaterFactory } from '../utilities/utilities';

import './registerPage.css';

export const RegisterPage = (): JSX.Element => {
  const [loginValue, setLoginValue] = useState('');
  const [loginValidationResult, setLoginValidationResult] = useState<ValidationResult>({
    message: '',
    valid: false,
  });

  const [emailValue, setEmailValue] = useState('');
  const [emailValidationResult, setEmailValidationResult] = useState<ValidationResult>({
    message: '',
    valid: false,
  });

  const [passwordValue, setPasswordValue] = useState('');
  const [passwordValidationResult, setPasswordValidationResult] = useState<ValidationResult>({
    message: '',
    valid: false,
  });

  const [repeatPasswordValue, setRepeatPasswordValue] = useState('');
  const [repeatPasswordValidationResult, setRepeatPasswordValidationResult] =
    useState<ValidationResult>({
      message: '',
      valid: false,
    });

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
            passwordValidationResult,
            repeatPasswordValidationResult,
          ]}
        >
          <InputField
            view="labeled"
            value={loginValue}
            name="login"
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
            view="labeled"
            value={emailValue}
            name="email"
            label="Email"
            type="email"
            errorText={emailValidationResult.message}
            isValid={emailValidationResult.valid}
            valueChangeCallback={inputValueUpdaterFactory(
              emailValidator,
              setEmailValidationResult,
              setEmailValue,
            )}
          />
          <InputField
            view="labeled"
            value={passwordValue}
            name="password"
            label="Пароль"
            type="password"
            errorText={passwordValidationResult.message}
            isValid={passwordValidationResult.valid}
            valueChangeCallback={inputValueUpdaterFactory(
              passwordValidator,
              setPasswordValidationResult,
              setPasswordValue,
            )}
          />
          <InputField
            view="labeled"
            value={repeatPasswordValue}
            name="repeatPassword"
            label="Пароль (еще раз)"
            type="password"
            errorText={repeatPasswordValidationResult.message}
            isValid={repeatPasswordValidationResult.valid}
            valueChangeCallback={inputValueUpdaterFactory(
              bindArgsFromN(passwordValidator, 2, passwordValue),
              setRepeatPasswordValidationResult,
              setRepeatPasswordValue,
            )}
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
