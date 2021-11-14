import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../../components/PageContainer/Footer/Footer';
import { PageContainer } from '../../components/PageContainer';
import { Header } from '../../components/Header';
import { Form } from '../../components/Form';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { loginValidator, passwordValidator, ValidationResult } from '../../utilities/validators';
import { inputValueUpdaterFactory } from '../utilities/utilities';

import './loginPage.css';

export const LoginPage = (): JSX.Element => {
  const [loginValue, setLoginValue] = useState('');
  const [loginValidationResult, setLoginValidationResult] = useState<ValidationResult>({
    message: '',
    valid: false,
  });
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordValidationResult, setPasswordValidationResult] = useState<ValidationResult>({
    message: '',
    valid: false,
  });

  return (
    <div className="login-page">
      <Header size="s">
        <Title headingLevel={2} align="center">
          Входи, защитник
        </Title>
      </Header>
      <PageContainer size="s">
        <Form validationResults={[loginValidationResult, passwordValidationResult]}>
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

          <Footer className="login-page__footer">
            <Button
              text="Авторизоваться"
              type="submit"
              disabled={!(loginValidationResult.valid && passwordValidationResult.valid)}
              className="center-horizontal"
            />

            <Link className="footer__link" to="/register">
              Нет аккаунта?
            </Link>
          </Footer>
        </Form>
      </PageContainer>
    </div>
  );
};
