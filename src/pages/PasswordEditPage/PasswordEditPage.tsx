import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import { Header } from '../../components/Header';
import { PageContainer } from '../../components/PageContainer';
import { Form } from '../../components/Form';
import { passwordValidator, ValidationResult } from '../../utilities/validators';
import { bindArgsFromN } from '../../utilities/utilities';
import { Avatar } from '../../components/Avatar';
import { Footer } from '../../components/Footer';
import { inputValueUpdaterFactory } from '../utilities';
import { InputNames } from '../../consts';
import { usersController } from '../../controllers';
import { store } from '../../store';

import './passwordEditPage.css';

export const PasswordEditPage = () => {
  const navigate = useNavigate();

  const [editResult, setEditResult] = useState(false);

  const [oldPasswordValue, setOldPasswordValue] = useState('');
  const [oldPasswordValidationResult, setOldPasswordValidationResult] = useState<ValidationResult>({
    message: '',
    valid: false,
  });

  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [newPasswordValidationResult, setNewPasswordValidationResult] = useState<ValidationResult>({
    message: '',
    valid: false,
  });

  const [repeatPasswordValue, setRepeatPasswordValue] = useState('');
  const [repeatPasswordValidationResult, setRepeatPasswordValidationResult] =
    useState<ValidationResult>({
      message: '',
      valid: false,
    });

  useEffect(() => {
    if (editResult) {
      navigate('/password-edit', { replace: true });
    }
  }, [editResult, navigate]);

  if (store.user === null) {
    return <Navigate to="/login" />;
  }

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
          controllerCallback={usersController.updatePassword.bind(usersController)}
          setSubmitResult={setEditResult}
        >
          <InputField
            name={InputNames.OLD_PASSWORD}
            value={oldPasswordValue}
            type="password"
            label="Старый пароль"
            errorText={oldPasswordValidationResult.message}
            isValid={oldPasswordValidationResult.valid}
            valueChangeCallback={inputValueUpdaterFactory(
              passwordValidator,
              setOldPasswordValidationResult,
              setOldPasswordValue,
            )}
          />
          <InputField
            name={InputNames.NEW_PASSWORD}
            value={newPasswordValue}
            type="password"
            label="Введите новый пароль"
            valueChangeCallback={inputValueUpdaterFactory(
              passwordValidator,
              setNewPasswordValidationResult,
              setNewPasswordValue,
            )}
          />
          <InputField
            name={InputNames.REPEAT_PASSWORD}
            value={repeatPasswordValue}
            type="password"
            label="Повторите новый пароль"
            errorText={repeatPasswordValidationResult.message}
            isValid={repeatPasswordValidationResult.valid}
            valueChangeCallback={inputValueUpdaterFactory(
              bindArgsFromN(passwordValidator, 2, newPasswordValue),
              setRepeatPasswordValidationResult,
              setRepeatPasswordValue,
            )}
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
