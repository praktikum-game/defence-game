import React, { FormEvent } from 'react';
import { FormProps } from './types';
import './form.css';

export const Form = ({
  children,
  validationResults = [],
  ...otherProps
}: FormProps): JSX.Element => {
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    console.log('Submitted!');
    for (const result of validationResults) {
      if (!result.valid) {
        console.log(result.message);
        return;
      }
    }
    const formData = new FormData(form);
    for (const [key, value] of formData.entries()) {
      console.log({ key, value });
    }
    form.reset();
  };

  return (
    <form className="form" {...otherProps} onSubmit={submitHandler}>
      {children}
    </form>
  );
};
