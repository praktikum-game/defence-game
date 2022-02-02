import React, { FormEvent, useCallback } from 'react';
import block from 'bem-cn';
import { FormProps } from './types';
import './form.css';

const b = block('form');

export const Form = ({ children, className, onFormSubmit }: FormProps) => {
  const handleFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;

      const formData = new FormData(form);
      onFormSubmit(formData);
    },
    [onFormSubmit],
  );

  return (
    <form className={b.mix(className)} onSubmit={handleFormSubmit}>
      {children}
    </form>
  );
};
