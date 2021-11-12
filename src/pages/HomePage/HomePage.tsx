import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { AppNavigation } from '../../components/AppNaviagation';
import { email, required, validate, ValidationResult } from '../../utilities/validators';
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

  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  useEffect(() => {
    checkInputField(inputValue);
  }, [inputValue]);

  return (
    <div className="homePage">
      <h1>Мое супер приложение</h1>
      <AppNavigation />
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
