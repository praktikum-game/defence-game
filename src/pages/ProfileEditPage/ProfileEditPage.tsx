import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import { Header } from '../../components/Header';
import { PageContainer } from '../../components/PageContainer';
import { Form } from '../../components/Form';
import EditIcon from './static/edit.svg';
import { Avatar } from '../../components/Avatar';
import { Footer } from '../../components/Footer';
import { InputNames } from '../../consts';
import { AppState } from '../../store';
import {
  loginValidator,
  emailValidator,
  nameValidator,
  phoneValidator,
} from '../../utilities/validators';
import { useFormInput } from '../../hooks/useFormInput/useFormInput';
import { ProfileUpdateRequest } from '../../api/users';
import { userUpdateProfile } from '../../store/user/actions/action-creators';

import './profileEditPage.css';
import { getValueByKey } from '../../utilities/utilities';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';

export const ProfileEditPage = () => {
  useAuthRedirect('/');

  const dispatch = useDispatch();
  const userData = useSelector((state: AppState) => state.user.data);

  const [{ value: loginValue, validationResult: loginValidationResult }, setLoginValue] =
    useFormInput(loginValidator, getValueByKey(userData, 'login'));

  const [{ value: phoneValue, validationResult: phoneValidationResult }, setPhoneValue] =
    useFormInput(phoneValidator, getValueByKey(userData, 'phone'));

  const [
    { value: firstNameValue, validationResult: firstNameValidationResult },
    setFirstNameValue,
  ] = useFormInput(nameValidator, getValueByKey(userData, 'first_name'));

  const [
    { value: secondNameValue, validationResult: secondNameValidationResult },
    setSecondNameValue,
  ] = useFormInput(nameValidator, getValueByKey(userData, 'second_name'));

  const [
    { value: displayNameValue, validationResult: displayNameValidationResult },
    setDisplayNameValue,
  ] = useFormInput(nameValidator, getValueByKey(userData, 'display_name'));

  const [{ value: emailValue, validationResult: emailValidationResult }, setEmailValue] =
    useFormInput(emailValidator, getValueByKey(userData, 'email'));

  const updateProfileCallback = useCallback(
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

  return (
    <div className="profile-edit-page">
      <Header backButton={true}>
        <Avatar />
      </Header>
      <PageContainer className="profile-edit-page__page-container" size="m">
        <Form
          className="profile-edit-page__form"
          validationResults={[
            loginValidationResult,
            emailValidationResult,
            phoneValidationResult,
            firstNameValidationResult,
            secondNameValidationResult,
            displayNameValidationResult,
          ]}
          controllerCallback={updateProfileCallback}
        >
          <InputField
            name={InputNames.LOGIN}
            value={loginValue}
            label="Логин"
            errorText={loginValidationResult.message}
            isValid={loginValidationResult.valid}
            valueChangeCallback={setLoginValue}
          />
          <InputField
            name={InputNames.FIRST_NAME}
            value={firstNameValue}
            type="text"
            label="Имя"
            errorText={firstNameValidationResult.message}
            isValid={loginValidationResult.valid}
            valueChangeCallback={setFirstNameValue}
          />
          <InputField
            name={InputNames.EMAIL}
            value={emailValue}
            type="E-mail"
            label="E-mail"
            errorText={emailValidationResult.message}
            isValid={loginValidationResult.valid}
            valueChangeCallback={setEmailValue}
          />
          <InputField
            name={InputNames.SECOND_NAME}
            value={secondNameValue}
            type="text"
            label="Фамилия"
            errorText={secondNameValidationResult.message}
            isValid={loginValidationResult.valid}
            valueChangeCallback={setSecondNameValue}
          />
          <InputField
            name={InputNames.DISPLAY_NAME}
            value={displayNameValue}
            type="text"
            label="Никнейм"
            errorText={displayNameValidationResult.message}
            isValid={loginValidationResult.valid}
            valueChangeCallback={setDisplayNameValue}
          />
          <InputField
            name={InputNames.PHONE}
            value={phoneValue}
            type="tel"
            label="Телефон"
            errorText={phoneValidationResult.message}
            isValid={loginValidationResult.valid}
            valueChangeCallback={setPhoneValue}
          />
          <div className="password-edit">
            <InputField
              name={InputNames.PASSWORD}
              value="********"
              type="password"
              label="Пароль"
              disabled
            />
            <div className="password-edit__icon">
              <Link to="/password-edit">
                <img src={EditIcon} alt="Изменить пароль" />
              </Link>
            </div>
          </div>
          <Footer className="profile-edit-page__footer">
            <Button
              type="submit"
              className="profile-edit-page__button"
              text="Сохранить"
              view="primary"
              disabled={
                !(
                  loginValidationResult.valid &&
                  emailValidationResult.valid &&
                  firstNameValidationResult.valid &&
                  secondNameValidationResult.valid &&
                  displayNameValidationResult.valid &&
                  phoneValidationResult.valid
                )
              }
            ></Button>
            <Link to="/profile">
              <Button
                type="button"
                className="profile-edit-page__button"
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
