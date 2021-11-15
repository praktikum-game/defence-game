import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import { Header } from '../../components/Header';
import { PageContainer } from '../../components/PageContainer';
import { Form } from '../../components/Form';
import { passwordValidator, ValidationResult } from '../../utilities/validators';
import { Avatar } from '../../components/Avatar';
import { Footer } from '../../components/Footer';

import './passwordEditPage.css';

export const PasswordEditPage = () => {
  const [oldInputValue, setOldInputValue] = useState<string>('');
  const [newInputValue, setNewInputValue] = useState<string>('');
  const [repeatInputValue, setRepeatInputValue] = useState<string>('');

  const [oldInputError, setOldInputError] = useState<ValidationResult>({
    valid: true,
    message: null,
  });
  const [newInputError, setNewInputError] = useState<ValidationResult>({
    valid: true,
    message: null,
  });
  const [repeatInputError, setRepeatInputError] = useState<ValidationResult>({
    valid: true,
    message: null,
  });

  const checkOldInputField = (value: string) => {
    const validationResult = passwordValidator(value);
    setOldInputError(validationResult);
  };
  const checkNewInputField = (value: string) => {
    const validationResult = passwordValidator(value);
    setNewInputError(validationResult);
  };
  const checkRepeatInputField = (value: string) => {
    const validationResult = passwordValidator(value);
    setRepeatInputError(validationResult);
  };

  const handleOldInput = useCallback((value: string) => {
    setOldInputValue(value);
  }, []);
  const handleNewInput = useCallback((value: string) => {
    setNewInputValue(value);
  }, []);
  const handleRepeatInput = useCallback((value: string) => {
    setRepeatInputValue(value);
  }, []);

  useEffect(() => {
    checkOldInputField(oldInputValue);
  }, [oldInputValue]);
  useEffect(() => {
    checkNewInputField(newInputValue);
  }, [newInputValue]);
  useEffect(() => {
    checkRepeatInputField(repeatInputValue);
  }, [repeatInputValue]);

  return (
    <div className="profile-edit-page">
      <Header backButton={true}>
        <Avatar />
        <div />
      </Header>
      <PageContainer size="m">
        <Form className="password-edit-page__form">
          <InputField
            id="old_password"
            value={oldInputValue}
            type="password"
            label="Старый пароль"
            valueChangeCallback={handleOldInput}
            isValid={oldInputError.valid}
            errorText={oldInputError.message}
          />
          <InputField
            id="new_password"
            value={newInputValue}
            type="password"
            label="Введите новый пароль"
            valueChangeCallback={handleNewInput}
            isValid={newInputError.valid}
            errorText={newInputError.message}
          />
          <InputField
            id="repeat_password"
            value={repeatInputValue}
            type="password"
            label="Повторите новый пароль"
            valueChangeCallback={handleRepeatInput}
            isValid={repeatInputError.valid}
            errorText={repeatInputError.message}
          />
          <Footer className="password-edit-page__footer">
            <Button
              type="submit"
              className="password-edit-page__button"
              text="Сохранить"
              view="primary"
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
