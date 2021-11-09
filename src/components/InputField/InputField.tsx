import React, { FC } from 'react';
import { InputFieldProps } from '.';
import './input-field.css';

export const InputField: FC<InputFieldProps> = ({
  flex = true,
  type = 'text',
  disabled = false,
  isValid = true,
  errorText = null,
  ...rest
}) => {
  const { valueChangeCallback, ...otherProps } = rest;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    if (valueChangeCallback !== undefined) {
      valueChangeCallback(value);
    }
  };

  return (
    <div className={`input-field ${flex && 'input-field_flex'}`}>
      {rest.label && <label className="input-field__label ">{rest.label}</label>}
      <input
        className="input-field__input"
        type={type}
        disabled={disabled}
        {...otherProps}
        onChange={handleChange}
      />
      {!isValid && <span className="input-field__error-text">{errorText}</span>}
    </div>
  );
};
