import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import { Header } from '../../components/Header';
import { PageContainer } from '../../components/PageContainer';
import { Form } from '../../components/Form';
import { passwordValidator, ValidationResult } from '../../utilities/validators';
// import { bindArgsFromN } from '../../utilities/utilities';
import { Avatar } from '../../components/Avatar';
import { Footer } from '../../components/Footer';
import { InputNames } from '../utilities';
import './passwordEditPage.css';

type FormInputObject = {
  value: string;
  errorMessage: string | null;
  isValid: boolean;
};

type ValidatorFunction = (value: string) => ValidationResult;

const useFormInput = (
  validator: ValidatorFunction,
  initialObject: FormInputObject = {
    value: '',
    errorMessage: null,
    isValid: false,
  },
) => {
  const [value, setValue] = useState(initialObject.value);
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    message: initialObject.errorMessage,
    valid: initialObject.isValid,
  });

  const changeValidationResult = (val: string) => {
    const result = validator(val);
    setValidationResult(result);
  };

  const changeValue = (val: string) => {
    setValue(val);
    changeValidationResult(val);
  };

  const resultObject: FormInputObject = {
    value,
    errorMessage: validationResult.message,
    isValid: validationResult.valid,
  };

  return { resultObject, changeValue };
};

export const PasswordEditPage = () => {
  const { resultObject: oldPassword, changeValue: setOldPassword } =
    useFormInput(passwordValidator);

  const { resultObject: newPassword, changeValue: setNewPassword } =
    useFormInput(passwordValidator);

  const { resultObject: repeatPassword, changeValue: setRepeatPassword } =
    useFormInput(passwordValidator);

  return (
    <div className="profile-edit-page">
      <Header backButton={true}>
        <Avatar />
      </Header>
      <PageContainer size="m">
        <Form
          className="password-edit-page__form"
          // validationResults={[
          //   oldPasswordValidationResult,
          //   newPasswordValidationResult,
          //   repeatPasswordValidationResult,
          // ]}
        >
          <InputField
            name={InputNames.OLD_PASSWORD}
            value={oldPassword.value}
            type="password"
            label="Старый пароль"
            errorText={oldPassword.errorMessage}
            isValid={oldPassword.isValid}
            valueChangeCallback={setOldPassword}
          />
          <InputField
            name={InputNames.NEW_PASSWORD}
            value={newPassword.value}
            type="password"
            label="Введите новый пароль"
            valueChangeCallback={setNewPassword}
          />
          <InputField
            name={InputNames.REPEAT_PASSWORD}
            value={repeatPassword.value}
            type="password"
            label="Повторите новый пароль"
            errorText={repeatPassword.errorMessage}
            isValid={repeatPassword.isValid}
            // valueChangeCallback={inputValueUpdaterFactory(
            //   bindArgsFromN(passwordValidator, 2, newPasswordValue),
            //   setRepeatPasswordValidationResult,
            //   setRepeatPasswordValue,
            // )}
            valueChangeCallback={setRepeatPassword}
          />
          <Footer className="password-edit-page__footer">
            <Button
              type="submit"
              className="password-edit-page__button"
              text="Сохранить"
              view="primary"
              disabled={!(oldPassword.isValid && newPassword.isValid && repeatPassword.isValid)}
            ></Button>
            <Link to="/profile-edit">
              <Button
                type="button"
                className="password-edit-page__button"
                text="Отменить"
                view="secondary"
              ></Button>
            </Link>
          </Footer>
        </Form>
      </PageContainer>
    </div>
  );
};
