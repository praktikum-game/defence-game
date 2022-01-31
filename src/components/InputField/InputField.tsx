import React from 'react';
import block from 'bem-cn';
import sanitizeHtml from 'sanitize-html';

import { InputFieldProps } from './types';
import './input-field.css';

const b = block('input-field');

export const InputField = ({
  name = 'TextField',
  label = name,
  flex = true,
  type = 'text',
  disabled = false,
  autoComplete = 'off',
  view = 'labeled',
  ...props
}: InputFieldProps) => {
  const { onTextChange, id, errors, value: fieldValue, ...otherProps } = props;

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    if (onTextChange) {
      onTextChange(sanitizeHtml(value));
    }
  };

  return (
    <div className={b({ [view]: true, flex })}>
      {view === 'labeled' && (
        <label htmlFor={id ?? name} className={b('label')}>
          <strong>{label}</strong>
        </label>
      )}
      <input
        id={id ?? name}
        className={b('input')}
        type={type}
        disabled={disabled}
        name={name}
        autoComplete={autoComplete}
        onChange={handleTextChange}
        value={fieldValue}
        {...otherProps}
      />
      {errors && errors.length > 0 && <span className={b('error-text')}>{errors[0]}</span>}
    </div>
  );
};
