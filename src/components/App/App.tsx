import React, { FC } from 'react';
import InputField from '../InputField';
import Button from '../Button';
import './App.css';
import InputValidators from '../../utilites/InputValidator';

const App: FC = () => {
  const handleButtonClick = () => {
    alert('Clicked event');
  };

  return (
    <div className="title">
      <h1>Мое супер приложение</h1>
      <InputField
        type="email"
        label="MyText Field"
        required
        onChange={(value) => console.log('text', value)}
        placeholder="Введите значение поля"
        validators={[
          { checkFunction: InputValidators.require(), message: 'Это обязательное поле' },
          { checkFunction: InputValidators.email(), message: 'Это не email' },
        ]}
      />
      <Button onClick={handleButtonClick} text="MyButton" view="primary"></Button>
    </div>
  );
};

export default App;
