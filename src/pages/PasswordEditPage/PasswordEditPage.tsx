import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import { Header } from '../../components/Header';
import { PageContainer } from '../../components/PageContainer';
import { Form } from '../../components/Form';
import { passwordValidator } from '../../utilities/validators';
// import { bindArgsFromN } from '../../utilities/utilities';
import { Avatar } from '../../components/Avatar';
import { Footer } from '../../components/Footer';
import { InputNames } from '../utilities';
import './passwordEditPage.css';
import { useFormInput } from '../../components/Form/hooks';

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
