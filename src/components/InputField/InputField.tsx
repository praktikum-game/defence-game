import React from 'react';
import block from 'bem-cn';
import { InputFieldProps } from '.';
import './input-field.css';

const b = block('input-field');

export const InputField = ({
  flex = true,
  type = 'text',
  disabled = false,
  isValid = true,
  errorText = null,
  view = 'default',
  ...props
}: InputFieldProps): JSX.Element => {
  const { valueChangeCallback, ...otherProps } = props;
  const { id, name } = otherProps;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    if (valueChangeCallback !== undefined) {
      valueChangeCallback(value);
    }
  };

  return (
    <div className={b({ [view]: true, flex })}>
      {props.label && (
        <label htmlFor={id ?? name} className={b('label')}>
          {props.label}
        </label>
      )}
      <input
        id={id ?? name}
        className={b('input')}
        type={type}
        disabled={disabled}
        {...otherProps}
        onChange={handleChange}
      />
      {!isValid && <span className={b('error-text')}>{errorText}</span>}
    </div>
  );
};
