import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import { Header } from '../../components/Header';
import { PageContainer } from '../../components/PageContainer';
import { Form } from '../../components/Form';
import { passwordValidator } from '../../utilities/validators';
import { bindArgsFromN } from '../../utilities/utilities';
import { Avatar } from '../../components/Avatar';
import { Footer } from '../../components/Footer';
import { InputNames } from '../../consts';
import { useFormInput } from '../../hooks/useFormInput/useFormInput';
import { ProfilePasswordUpdateRequest, usersAPI } from '../../api/users';

import './passwordEditPage.css';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';

export const PasswordEditPage = () => {
  const navigate = useNavigate();

  useAuthRedirect('/');

  const [editResult, setEditResult] = useState(false);

  const [
    { value: oldPasswordValue, validationResult: oldPasswordValidationResult },
    setOldPasswordValue,
  ] = useFormInput(passwordValidator);

  const [
    { value: newPasswordValue, validationResult: newPasswordValidationResult },
    setNewPasswordValue,
  ] = useFormInput(passwordValidator);

  const [
    { value: repeatPasswordValue, validationResult: repeatPasswordValidationResult },
    setRepeatPasswordValue,
  ] = useFormInput(passwordValidator);

  useEffect(() => {
    if (editResult) {
      navigate('/password-edit', { replace: true });
    }
  }, [editResult, navigate]);

  const updatePasswordCallback = useCallback(async (data: FormData) => {
    const passwordData: ProfilePasswordUpdateRequest = {
      oldPassword: String(data.get('oldPassword')),
      newPassword: String(data.get('newPassword')),
    };
    usersAPI.updatePassword(passwordData);
  }, []);

  return (
    <div className="profile-edit-page">
      <Header backButton={true}>
        <Avatar />
      </Header>
      <PageContainer size="m">
        <Form
          className="password-edit-page__form"
          validationResults={[
            oldPasswordValidationResult,
            newPasswordValidationResult,
            repeatPasswordValidationResult,
          ]}
          controllerCallback={updatePasswordCallback}
          setSubmitResult={setEditResult}
        >
          <InputField
            name={InputNames.OLD_PASSWORD}
            value={oldPasswordValue}
            type="password"
            label="Старый пароль"
            errorText={oldPasswordValidationResult.message}
            isValid={oldPasswordValidationResult.valid}
            valueChangeCallback={setOldPasswordValue}
          />
          <InputField
            name={InputNames.NEW_PASSWORD}
            value={newPasswordValue}
            type="password"
            label="Введите новый пароль"
            valueChangeCallback={setNewPasswordValue}
          />
          <InputField
            name={InputNames.REPEAT_PASSWORD}
            value={repeatPasswordValue}
            type="password"
            label="Повторите новый пароль"
            errorText={repeatPasswordValidationResult.message}
            isValid={repeatPasswordValidationResult.valid}
            valueChangeCallback={bindArgsFromN(setRepeatPasswordValue, 2, newPasswordValue)}
          />
          <Footer className="password-edit-page__footer">
            <Button
              type="submit"
              className="password-edit-page__button"
              text="Сохранить"
              view="primary"
              disabled={
                !(
                  oldPasswordValidationResult.valid &&
                  newPasswordValidationResult.valid &&
                  repeatPasswordValidationResult.valid
                )
              }
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
