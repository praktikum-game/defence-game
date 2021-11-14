import React, { FormEvent, useCallback } from 'react';
import block from 'bem-cn';
import { FormProps } from './types';
import './form.css';

const b = block('form');

export const Form = ({
  children,
  validationResults = [],
  className,
  isResetForm = true,
  controllerCallback = () => Promise.resolve(),
  resetValuesCallback = () => {},
  ...props
}: FormProps) => {
  const submitHandler = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;

      for (const result of validationResults) {
        if (!result.valid) {
          console.log(result.message);
          return;
        }
      }
      const formData = new FormData(form);

      controllerCallback(formData).then(() => {
        if (isResetForm) {
          resetValuesCallback();
        }
      });
    },
    [validationResults, isResetForm, controllerCallback, resetValuesCallback],
  );

  return (
    <form className={b.mix(className)} {...props} onSubmit={submitHandler}>
      {children}
    </form>
  );
};
