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
import { useDispatch } from 'react-redux';
import { showNotificationWithTimeout } from 'store/notification/actions/action-creators';
import { NotificationsPanel } from 'components/NotificationsPanel';

export const LoginPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const { executeAuth } = useAuthUser();
  const startOAuth = useOAuth(OAUTH_REDIRECT_URL, OAUTH_CLIENT_ID);

  const [{ value: loginValue, messages: loginErrorMessages }, setLoginValue] =
    useFormInput(loginValidator);

  const [{ value: passwordValue, messages: passwordErrorMessages }, setPasswordValue] =
    useFormInput(passwordValidator);

  const handleFormSubmit = useCallback(
    async (data: FormData) => {
      try {
        await executeAuth({
          login: String(data.get('login')),
          password: String(data.get('password')),
        });
      } catch (e: unknown) {
        dispatch(
          showNotificationWithTimeout({
            title: 'Ошибка входв',
            text: 'Не удалость войти. Проверьте ввод логина/пароля',
            type: 'warning',
          }),
        );
      } finally {
        setPasswordValue('');
      }
    },
    [executeAuth, setPasswordValue, dispatch],
  );

  return (
    <>
      <NotificationsPanel />
      <div className="login-page">
        <Header size="s">
          <Title headingLevel={2} align="center">
            Входи, защитник
          </Title>
        </Header>
        <PageContainer size="s">
          <Form onFormSubmit={handleFormSubmit}>
            <InputField
              view="labeled"
              value={loginValue}
              name={InputNames.LOGIN}
              label="Логин"
              errors={loginErrorMessages}
              type="text"
              onTextChange={setLoginValue}
            />
            <InputField
              view="labeled"
              value={passwordValue}
              name={InputNames.PASSWORD}
              label="Пароль"
              type="password"
              errors={passwordErrorMessages}
              onTextChange={setPasswordValue}
            />

            <Footer className="login-page__footer">
              <Button
                text="Авторизоваться"
                type="submit"
                disabled={
                  !(
                    loginErrorMessages.length < 1 &&
                    passwordErrorMessages.length < 1 &&
                    loginValue.length > 0 &&
                    passwordValue.length > 0
                  )
                }
                className="center-horizontal"
              />
              <Button type="button" onClick={startOAuth} text="Войти через Яндекс"></Button>

              <Link className="footer__link" to="/register">
                Нет аккаунта?
              </Link>
            </Footer>
          </Form>
        </PageContainer>
      </div>
    </>
  );
};
