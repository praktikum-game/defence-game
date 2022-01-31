import React, { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import { Header } from '../../components/Header';
import { PageContainer } from '../../components/PageContainer';
import { Form } from '../../components/Form';
import { Avatar } from '../../components/Avatar';
import { Footer } from '../../components/Footer';
import { InputNames } from '../../consts';
import { AppState } from '../../store';
import {
  loginValidator,
  emailValidator,
  nameValidator,
  phoneValidator,
  avatarValidator,
} from '../../utilities/validators';
import { useFormInput } from '../../hooks/useFormInput/useFormInput';
import { ProfileUpdateRequest } from '../../api/users';
import { userUpdateAvatar, userUpdateProfile } from '../../store/user/actions/action-creators';
import { useAvatar } from 'hooks/useAvatar/useAvatar';
import { getValueByKey } from '../../utilities';
import { LogoutButton } from './LogoutButton';
import { Title } from 'components/Title';

import { displayNameValidator } from 'utilities/validators/validators';

import './profile-page.css';

export const ProfileEditPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: AppState) => state.user.data);
  const { getAvatar } = useAvatar();

  const [searchParams, setSearchParams] = useSearchParams();

  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [avatarPath] = useState<string | undefined>();

  useEffect(() => {
    if (searchParams.get('type') === 'edit') {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }
  }, [searchParams]);

  const [{ value: loginValue, messages: loginErrors }, setLoginValue] = useFormInput(
    loginValidator,
    getValueByKey(userData, 'login'),
  );

  const [{ value: phoneValue, messages: phoneErrors }, setPhoneValue] = useFormInput(
    phoneValidator,
    getValueByKey(userData, 'phone'),
  );

  const [{ value: firstNameValue, messages: firstNameErrors }, setFirstNameValue] = useFormInput(
    nameValidator,
    getValueByKey(userData, 'first_name'),
  );

  const [{ value: secondNameValue, messages: secondNameErrors }, setSecondNameValue] = useFormInput(
    nameValidator,
    getValueByKey(userData, 'second_name'),
  );

  const [{ value: displayNameValue, messages: displayNameErrors }, setDisplayNameValue] =
    useFormInput(displayNameValidator, getValueByKey(userData, 'display_name'));

  const [{ value: emailValue, messages: emailErrors }, setEmailValue] = useFormInput(
    emailValidator,
    getValueByKey(userData, 'email'),
  );

  const [{ messages: avatarErrors }, setAvatarValue] = useFormInput(
    avatarValidator,
    getValueByKey(userData, 'avatar'),
  );

  const handleUpdateProfileFormSubmit = useCallback(
    async (data: FormData) => {
      const profileUpdateData: ProfileUpdateRequest = {
        first_name: String(data.get('first_name')),
        second_name: String(data.get('second_name')),
        display_name: String(data.get('display_name')),
        login: String(data.get('login')),
        email: String(data.get('email')),
        phone: String(data.get('phone')),
      };

      dispatch(userUpdateProfile(profileUpdateData));
    },
    [dispatch],
  );

  const handleUpdateAvatarFormSubmit = useCallback(
    async (data: FormData) => {
      dispatch(userUpdateAvatar(data));
    },
    [dispatch],
  );

  const handleCancelEditClick = useCallback(() => {
    setSearchParams({ type: 'veiw' }, { replace: true });
  }, [setSearchParams]);

  const handleEditClick = useCallback(() => {
    setSearchParams({ type: 'edit' }, { replace: true });
  }, [setSearchParams]);

  return (
    <div className="profile-page">
      <Header backButton={true}>
        <Avatar src={getAvatar()} />
        <LogoutButton />
      </Header>
      <PageContainer className="profile-page__page-container" size="m">
        <Title headingLevel={3} align="center">
          {userData?.display_name}
        </Title>
        {isEdited && (
          <Form className="profil-page__form" onFormSubmit={handleUpdateAvatarFormSubmit}>
            <InputField
              name={InputNames.AVATAR}
              label="Avatar"
              type="file"
              accept="image/*"
              errors={avatarErrors}
              value={avatarPath}
              onTextChange={setAvatarValue}
            />
            <Button
              className="profile-edit-page__button"
              type="submit"
              text="Загрузить"
              view="primary"
              disabled={!isEdited}
            />
          </Form>
        )}

        <Form className="profile-page__form" onFormSubmit={handleUpdateProfileFormSubmit}>
          <InputField
            name={InputNames.LOGIN}
            value={loginValue}
            type="text"
            label="Логин"
            errors={loginErrors}
            onTextChange={setLoginValue}
            disabled={!isEdited}
          />
          <InputField
            name={InputNames.FIRST_NAME}
            value={firstNameValue}
            type="text"
            label="Имя"
            errors={firstNameErrors}
            onTextChange={setFirstNameValue}
            disabled={!isEdited}
          />
          <InputField
            name={InputNames.EMAIL}
            label="E-mail"
            value={emailValue}
            type="email"
            errors={emailErrors}
            onTextChange={setEmailValue}
            disabled={!isEdited}
          />
          <InputField
            name={InputNames.SECOND_NAME}
            value={secondNameValue}
            type="text"
            label="Фамилия"
            errors={secondNameErrors}
            onTextChange={setSecondNameValue}
            disabled={!isEdited}
          />
          <InputField
            name={InputNames.DISPLAY_NAME}
            value={displayNameValue}
            type="text"
            label="Никнейм"
            errors={displayNameErrors}
            onTextChange={setDisplayNameValue}
            disabled={!isEdited}
          />
          <InputField
            name={InputNames.PHONE}
            value={phoneValue}
            type="tel"
            label="Телефон"
            errors={phoneErrors}
            onTextChange={setPhoneValue}
            disabled={!isEdited}
          />

          {isEdited && (
            <Link to="/password-edit">
              <Button text="Изменить пароль" />
            </Link>
          )}

          <Footer className="profile-page__footer">
            <Button
              type="submit"
              className="profile-page__button"
              text="Сохранить"
              view="primary"
              disabled={
                !(
                  loginErrors.length < 1 &&
                  loginValue.length > 0 &&
                  emailErrors.length < 1 &&
                  emailValue.length > 0 &&
                  firstNameErrors.length < 1 &&
                  firstNameValue.length > 0 &&
                  secondNameErrors.length < 1 &&
                  secondNameValue.length > 0 &&
                  displayNameErrors.length < 1 &&
                  displayNameValue.length > 0 &&
                  phoneErrors.length < 1 &&
                  phoneValue.length > 0
                )
              }
            ></Button>
            {isEdited === true ? (
              <Button
                type="button"
                className="profile-page__button"
                text="Отменить"
                view="secondary"
                onClick={handleCancelEditClick}
              ></Button>
            ) : (
              <Button
                type="button"
                className="profile-page__button"
                text="Редактировать"
                view="secondary"
                onClick={handleEditClick}
              ></Button>
            )}
          </Footer>
        </Form>
      </PageContainer>
    </div>
  );
};
