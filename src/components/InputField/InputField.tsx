import React, { FC, useState } from 'react';
import { validate, ValidationResult } from '../../utilites/validator';
import { InputFieldProps } from '.';
import './input-field.css';

export const InputField: FC<InputFieldProps> = ({
  flex = true,
  type = 'text',
  disabled = false,
  ...rest
}) => {
  const [error, setError] = useState<ValidationResult>({ valid: true, message: null });

  const checkInputField = (value: string) => {
    if (rest.validators) {
      const validationResult = validate(rest.validators, value);
      setError(validationResult);
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    checkInputField(value);
    rest.onChange(value);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    checkInputField(value);
  };

  return (
    <div className={`input-field ${flex && 'input-field_flex'}`}>
      {rest.label && <label className="input-field__label ">{rest.label}</label>}
      <input
        className="input-field__input"
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={rest.placeholder}
        type={type}
        disabled={disabled}
      />
      {<span className="input-field__error-text">{(!error.valid && error.message) || ' '}</span>}
    </div>
  );
};
