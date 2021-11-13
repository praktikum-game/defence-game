import React, { FormHTMLAttributes } from 'react';
import { ValidationResult } from '../../utilities/validators';

export type FormOwnProps = {
  children?: React.ReactNode;
  validationResults?: ValidationResult[];
  className_?: string;
} & FormHTMLAttributes<HTMLFormElement>;

export type FormProps = FormOwnProps;
