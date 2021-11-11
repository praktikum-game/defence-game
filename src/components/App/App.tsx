import React, { FC, FormEventHandler, useCallback, useEffect, useState } from 'react';
import { email, required, validate, ValidationResult } from '../../utilities/validators';
import { InputField } from '../InputField';
import { Button } from '../Button';
import { Form } from '../Form';
import './App.css';

const inputValidators = [
  { checkFunction: required(), message: 'Это обязательное поле' },
  { checkFunction: email(), message: 'Это не email' },
];

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

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();
    console.log('Submitted!');
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
        valueChangeCallback={handleInput}
        placeholder="Введите значение поля"
        isValid={inputError.valid}
        errorText={inputError.message}
      />

      <Button onClick={handleButtonClick} text="MyButton" view="primary"></Button>
      <Form onSubmit={handleFormSubmit}>
        <InputField
          type="text"
          label="Логин"
          placeholder="Введите значение поля"
          isValid={inputError.valid}
          errorText={inputError.message}
        />
        <Button text="Submit" view="primary"></Button>
      </Form>
    </div>
  );
};

export default App;
