import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { email, required, validate, ValidationResult } from '../../utilites/validator';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';

const inputValidators = [
  { checkFunction: required(), message: 'Это обязательное поле' },
  { checkFunction: email(), message: 'Это не email' },
];

export const HomePage = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputError, setInputError] = useState<ValidationResult>({ valid: true, message: null });

  const checkInputField = (value: string) => {
    const validationResult = validate(inputValidators, value);
    setInputError(validationResult);
  };

  const handleButtonClick = useCallback(() => {
    alert('Clicked event');
  }, []);

  const handleInput = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  useEffect(() => {
    checkInputField(inputValue);
  }, [inputValue]);

  return (
    <div className="homePage">
      <h1>Мое супер приложение</h1>
      <nav>
        <ul>
          <li>
            <Link to={'/profile'}>Профиль</Link>
          </li>
          <li>
            <Link to={'/login'}>Логин</Link>
          </li>
          <li>
            <Link to={'/register'}>Регистрация</Link>
          </li>
          <li>
            <Link to={'/game'}>Игра</Link>
          </li>
          <li>
            <Link to={'/ratings'}>Таблица игроков</Link>
          </li>
          <li>
            <Link to={'/forum'}>Форум</Link>
          </li>
        </ul>
      </nav>
      <InputField
        value={inputValue}
        type="email"
        label="MyText Field"
        onChange={handleInput}
        placeholder="Введите значение поля"
        isValid={inputError.valid}
        errorText={inputError.message}
      />

      <Button onClick={handleButtonClick} text="MyButton" view="primary"></Button>
    </div>
  );
};
