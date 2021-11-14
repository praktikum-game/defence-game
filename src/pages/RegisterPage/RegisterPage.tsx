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
  nameValidator,
  phoneValidator,
  ValidationResult,
} from '../../utilities/validators';
import { bindArgsFromN } from '../../utilities/utilities';
import { inputValueUpdaterFactory, InputNames } from '../utilities';
import { AuthController } from '../../controllers';

import './registerPage.css';

export const RegisterPage = () => {
  const [loginValue, setLoginValue] = useState('');
  const [loginValidationResult, setLoginValidationResult] = useState<ValidationResult>({
    message: '',
    valid: false,
  });

  const [phoneValue, setPhoneValue] = useState('');
  const [phoneValidationResult, setPhoneValidationResult] = useState<ValidationResult>({
    message: '',
    valid: false,
  });

  const [firstNameValue, setFirstNameValue] = useState('');
  const [firstNameValidationResult, setFirstNameValidationResult] = useState<ValidationResult>({
    message: '',
    valid: false,
  });

  const [secondNameValue, setSecondNameValue] = useState('');
  const [secondNameValidationResult, setSecondNameValidationResult] = useState<ValidationResult>({
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

  const resetInputValues = () => {
    setLoginValue('');
    setPhoneValue('');
    setFirstNameValue('');
    setSecondNameValue('');
    setEmailValue('');
    setPasswordValue('');
    setRepeatPasswordValue('');
  };

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
          controllerCallback={AuthController.register.bind(AuthController)}
          resetValuesCallback={resetInputValues}
        >
          <InputField
            view="labeled"
            value={loginValue}
            name={InputNames.LOGIN}
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
            value={phoneValue}
            name="phone"
            label="Телефон"
            errorText={phoneValidationResult.message}
            isValid={phoneValidationResult.valid}
            valueChangeCallback={inputValueUpdaterFactory(
              phoneValidator,
              setPhoneValidationResult,
              setPhoneValue,
            )}
          />
          <InputField
            view="labeled"
            value={firstNameValue}
            name="first_name"
            label="Имя"
            errorText={firstNameValidationResult.message}
            isValid={firstNameValidationResult.valid}
            valueChangeCallback={inputValueUpdaterFactory(
              nameValidator,
              setFirstNameValidationResult,
              setFirstNameValue,
            )}
          />
          <InputField
            view="labeled"
            value={secondNameValue}
            name="second_name"
            label="Фамилия"
            errorText={secondNameValidationResult.message}
            isValid={secondNameValidationResult.valid}
            valueChangeCallback={inputValueUpdaterFactory(
              nameValidator,
              setSecondNameValidationResult,
              setSecondNameValue,
            )}
          />
          <InputField
            view="labeled"
            value={emailValue}
            name={InputNames.EMAIL}
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
            name={InputNames.PASSWORD}
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
            name={InputNames.REPEAT_PASSWORD}
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
