import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import { PageContainer } from '../../components/PageContainer';
import { Header } from '../../components/Header';
import { Form } from '../../components/Form';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { loginValidator, passwordValidator } from '../../utilities/validators';
import { authController } from '../../controllers';
import { InputNames } from '../../consts';
import { storeOld } from '../../store';

import './loginPage.css';
import { useFormInput } from '../../components/Form/hooks/useFormInput';

export const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [loginResult, setLoginResult] = useState(false);

  const [{ value: loginValue, validationResult: loginValidationResult }, setLoginValue] =
    useFormInput(loginValidator);

  const [{ value: passwordValue, validationResult: passwordValidationResult }, setPasswordValue] =
    useFormInput(passwordValidator);

  const resetInputValues = useCallback(() => {
    setLoginValue('');
    setPasswordValue('');
  }, [setLoginValue, setPasswordValue]);

  useEffect(() => {
    if (loginResult) {
      navigate('/', { replace: true });
    }
  }, [loginResult, navigate]);

  const loginCallback = useCallback(async (data: FormData) => authController.login(data), []);

  if (storeOld.user !== null) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-page">
      <Header size="s">
        <Title headingLevel={2} align="center">
          Входи, защитник
        </Title>
      </Header>
      <PageContainer size="s">
        <Form
          validationResults={[loginValidationResult, passwordValidationResult]}
          controllerCallback={loginCallback}
          resetValuesCallback={resetInputValues}
          setSubmitResult={setLoginResult}
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
            value={passwordValue}
            name={InputNames.PASSWORD}
            label="Пароль"
            type="password"
            errorText={passwordValidationResult.message}
            isValid={passwordValidationResult.valid}
            valueChangeCallback={setPasswordValue}
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
