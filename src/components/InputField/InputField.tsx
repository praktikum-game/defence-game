import React, { FC, useState } from 'react';
import { validate, ValidationResult, ValidatorItem } from '../../utilites/InputValidator';
import './input-field.css';

type Props = {
  type: 'number' | 'text' | 'email' | 'hidden' | 'password';
  label?: string;
  flex?: boolean;
  placeholder?: string;
  required?: boolean;
  validators?: Array<ValidatorItem>;
  disabled?: boolean;
  onChange: (value: string) => void;
};

const InputField: FC<Props> = ({
  flex = true,
  type = 'text',
  disabled = false,
  required = true,
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
    <div className={`input-field ${flex && 'input-field--flex'}`}>
      {rest.label && (
        <label className="input-field__label ">
          {rest.label}
        </label>
      )}
      <input
        className="input-field__input"
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={rest.placeholder}
        type={type}
        disabled={disabled}
        required={required}
      />
      {<span className="input-field__error">{(!error.valid && error.message) || ' '}</span>}
    </div>
  );
};

export default InputField;
