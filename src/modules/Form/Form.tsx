import React from 'react';
import { FormProps } from './types';
import "./form.css"

export const Form = ({ children, ...otherProps }: FormProps): JSX.Element => (
  <form className="from" {...otherProps}>
    {children}
  </form>
);
