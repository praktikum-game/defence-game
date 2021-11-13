import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../../components/PageContainer';
import { Header } from '../../components/Header';
import { Form } from '../../components/Form';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { loginValidator, passwordValidator, ValidationResult } from '../../utilities/validators';
import { inputValueUpdaterFactory } from '../utilities/utilities';

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
    <>
      <PageContainer size="s">
        <Header>
          <Title align="center">Входи, защитник</Title>
        </Header>
        <Form validationResults={[loginValidationResult, passwordValidationResult]}>
          <InputField
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
            value={passwordValue}
            name="password"
            label="Пароль"
            errorText={passwordValidationResult.message}
            isValid={passwordValidationResult.valid}
            valueChangeCallback={inputValueUpdaterFactory(
              passwordValidator,
              setPasswordValidationResult,
              setPasswordValue,
            )}
          />
          <Button
            text="Авторизоваться"
            type="submit"
            disabled={!(loginValidationResult.valid && passwordValidationResult.valid)}
            className="center-horizontal"
          />
        </Form>
        <Link to="/register">
          <Title>Нет аккаунта?</Title>
        </Link>
      </PageContainer>
    </>
  );
};
