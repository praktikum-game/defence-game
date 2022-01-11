import React, { ChangeEventHandler, ReactEventHandler } from 'react';
import { TextAreaProps } from './types';
import block from 'bem-cn';

import './text-area.css';

const b = block('text-area');

export const TextArea = ({
  name,
  label = name,
  onChange,
  value,
  className,
  ...props
}: TextAreaProps) => {
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    onChange(name, event.target.value);
  };

  const handleSelect: ReactEventHandler<HTMLTextAreaElement> = (event) => {
    const { selectionStart, selectionEnd } = event.currentTarget;
    props.onSelect({ selectionStart, selectionEnd });
  };

  return (
    <div className={b.mix(className)}>
      <label className={b('label')} htmlFor={name}>
        <strong>{label}</strong>
      </label>
      <textarea
        className={b('text')}
        autoComplete="off"
        autoCorrect="off"
        onChange={handleChange}
        onSelect={handleSelect}
        value={value}
      ></textarea>
    </div>
  );
};
