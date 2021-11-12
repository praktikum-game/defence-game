import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../../components/PageContainer';
import { Header } from '../../components/Header';
import { Form } from '../../components/Form';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { loginValidator } from '../../utilities/validators';

export const LoginPage = (): JSX.Element => {
  const [loginValue, setLoginValue] = useState('');
  const [loginErrorText, setLoginErrorText] = useState<string | null>(null);
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState<string | null>(null);

  const updateLogin = (value: string) => {
    const validationResult = loginValidator(value);
    console.log(validationResult);
    setLoginErrorText(validationResult.message);
    setLoginValue(value);
  };

  const updatePassword = (value: string) => {
    const validationResult = loginValidator(value);
    setPasswordErrorText(validationResult.message);
    setPasswordValue(value);
  };

  return (
    <>
      <PageContainer>
        <Header>
          <Title>Входи, защитник</Title>
        </Header>
        <Form>
          <InputField
            value={loginValue}
            label="Логин"
            errorText={loginErrorText}
            isValid={loginErrorText === null}
            valueChangeCallback={updateLogin}
          />
          <InputField
            value={passwordValue}
            label="Пароль"
            errorText={passwordErrorText}
            isValid={passwordErrorText === null}
            valueChangeCallback={updatePassword}
          />
          <Button text="Авторизоваться" type="submit" />
        </Form>
        <Link to="/register">
          <Title>Нет аккаунта?</Title>
        </Link>
      </PageContainer>
    </>
  );
};
