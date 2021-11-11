import React, { FC, useCallback, useEffect, useState } from 'react';
import { email, required, validate, ValidationResult } from '../../utilites/validator';
import { InputField } from '../InputField';
import { Button } from '../Button';
import { LeaderboardTable, LeaderboardTableProps } from '../LeaderboardTable';
import './App.css';

const inputValidators = [
  { checkFunction: required(), message: 'Это обязательное поле' },
  { checkFunction: email(), message: 'Это не email' },
];

const tableData: LeaderboardTableProps = {
  columns: [
    { dataId: 'username', title: 'Имя пользователя' },
    { dataId: 'login', title: 'Логин' },
    { dataId: 'score', title: 'Колиество очков' },
  ],

  data: [
    { id: 'a123', login: 'vasya', username: 'Василий Алибабаевич', score: 168 },
    { id: 'a124', login: 'kosoy', username: 'Косой', score: 202 },
    { id: 'a125', login: 'hmyr', username: 'Хмырь', score: 386 },
    { id: 'a126', login: 'docent', username: 'Доцент', score: 409 },
  ],
};

const App: FC = () => {
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
    <div className="title">
      <h1>Мое супер приложение</h1>
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

      <LeaderboardTable {...tableData} />
    </div>
  );
};

export default App;
