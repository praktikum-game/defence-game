import React from 'react';
import { InputFieldProps } from '.';
import './input-field.css';

export const InputField = ({
  flex = true,
  type = 'text',
  disabled = false,
  isValid = true,
  errorText = null,
  ...rest
}: InputFieldProps): JSX.Element => {
  const { valueChangeCallback, ...otherProps } = rest;
  const { id } = otherProps;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    if (valueChangeCallback !== undefined) {
      valueChangeCallback(value);
    }
  };

  return (
    <div className={`input-field ${flex && 'input-field_flex'}`}>
      <input
        className="input-field__input"
        type={type}
        disabled={disabled}
        {...otherProps}
        onChange={handleChange}
      />
      {rest.label && (
        <label htmlFor={id} className="input-field__label ">
          {rest.label}
        </label>
      )}
      {!isValid && <span className="error-text input-field__error-text">{errorText}</span>}
    </div>
  );
};
