import React, { FC } from 'react';
import { email, required } from '../../utilites/validator';
import { InputField } from '../InputField';
import { Button } from '../Button';
import './App.css';

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
        onChange={(value) => console.log('text', value)}
        placeholder="Введите значение поля"
        validators={[
          { checkFunction: required(), message: 'Это обязательное поле' },
          { checkFunction: email(), message: 'Это не email' },
        ]}
      />
      <Button onClick={handleButtonClick} text="MyButton" view="primary"></Button>
    </div>
  );
};

export default App;
