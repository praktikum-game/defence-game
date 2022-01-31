import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import { Header } from '../../components/Header';
import { PageContainer } from '../../components/PageContainer';
import { Form } from '../../components/Form';
import { passwordValidator } from '../../utilities/validators';
import { bindArgsFromN } from '../../utilities';
import { Avatar } from '../../components/Avatar';
import { Footer } from '../../components/Footer';
import { InputNames } from '../../consts';
import { useFormInput } from '../../hooks/useFormInput/useFormInput';
import { ProfilePasswordUpdateRequest, usersAPI } from '../../api/users';
import { useAvatar } from 'hooks/useAvatar/useAvatar';

import './password-edit-page.css';
import { useDispatch } from 'react-redux';
import { showNotificationWithTimeout } from 'store/notification/actions/action-creators';

export const PasswordEditPage = () => {
  const dispatch = useDispatch();

  const { getAvatar } = useAvatar();

  const [{ value: oldPasswordValue, messages: oldPasswordErrors }, setOldPasswordValue] =
    useFormInput(passwordValidator);

  const [{ value: newPasswordValue, messages: newPasswordErrors }, setNewPasswordValue] =
    useFormInput(passwordValidator);

  const [{ value: repeatPasswordValue, messages: repeatPasswordErrors }, setRepeatPasswordValue] =
    useFormInput(passwordValidator);

  const handleUpdatePasswordFormSubmit = useCallback(
    async (data: FormData) => {
      const passwordData: ProfilePasswordUpdateRequest = {
        oldPassword: String(data.get(InputNames.OLD_PASSWORD)),
        newPassword: String(data.get(InputNames.NEW_PASSWORD)),
      };
      try {
        await usersAPI.updatePassword(passwordData);
      } catch {
        dispatch(
          showNotificationWithTimeout({
            title: 'Не удалось',
            text: 'Не удалось сменить пароль',
            type: 'warning',
          }),
        );
      }
    },
    [dispatch],
  );

  return (
    <div className="profile-edit-page">
      <Header backButton={true}>
        <Avatar src={getAvatar()} />
      </Header>
      <PageContainer size="m">
        <Form className="password-edit-page__form" onFormSubmit={handleUpdatePasswordFormSubmit}>
          <InputField
            name={InputNames.OLD_PASSWORD}
            value={oldPasswordValue}
            type="password"
            label="Старый пароль"
            errors={oldPasswordErrors}
            onTextChange={setOldPasswordValue}
          />
          <InputField
            name={InputNames.NEW_PASSWORD}
            value={newPasswordValue}
            type="password"
            label="Введите новый пароль"
            errors={newPasswordErrors}
            onTextChange={setNewPasswordValue}
          />
          <InputField
            name={InputNames.REPEAT_PASSWORD}
            value={repeatPasswordValue}
            type="password"
            label="Повторите новый пароль"
            errors={repeatPasswordErrors}
            onTextChange={bindArgsFromN(setRepeatPasswordValue, 2, newPasswordValue)}
          />
          <Footer className="password-edit-page__footer">
            <Button
              type="submit"
              className="password-edit-page__button"
              text="Сохранить"
              view="primary"
              disabled={
                !(
                  oldPasswordErrors.length < 1 &&
                  oldPasswordValue.length > 0 &&
                  newPasswordErrors.length < 1 &&
                  newPasswordValue.length > 0 &&
                  repeatPasswordErrors.length < 1 &&
                  repeatPasswordValue.length > 0
                )
              }
            ></Button>
            <Link to="/profile">
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
