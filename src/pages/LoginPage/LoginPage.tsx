import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import { PageContainer } from '../../components/PageContainer';
import { Header } from '../../components/Header';
import { Form } from '../../components/Form';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { loginValidator, passwordValidator } from '../../utilities/validators';
import { InputNames } from '../../consts';

import './loginPage.css';
import { useFormInput } from '../../hooks/useFormInput/useFormInput';
import { useOAuth } from '../../hooks/useOAuth';
import { useAuthUser } from '../../hooks/useAuthUser';

export const LoginPage = (): JSX.Element => {
  const { executeAuth } = useAuthUser();
  const { startOAuth } = useOAuth();

  const [{ value: loginValue, validationResult: loginValidationResult }, setLoginValue] =
    useFormInput(loginValidator);

  const [{ value: passwordValue, validationResult: passwordValidationResult }, setPasswordValue] =
    useFormInput(passwordValidator);

  const resetInputValues = useCallback(() => {
    setLoginValue('');
    setPasswordValue('');
  }, [setLoginValue, setPasswordValue]);

  const handleSubmitClick = useCallback(
    async (data: FormData) => {
      executeAuth({ login: String(data.get('login')), password: String(data.get('password')) });
    },
    [executeAuth],
  );

  const handleOAuthLogin = () => {
    startOAuth();
  };

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
          controllerCallback={handleSubmitClick}
          resetValuesCallback={resetInputValues}
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
            <Button onClick={handleOAuthLogin} text="Войти через Яндекс"></Button>

            <Link className="footer__link" to="/register">
              Нет аккаунта?
            </Link>
          </Footer>
        </Form>
      </PageContainer>
    </div>
  );
};
