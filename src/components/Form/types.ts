import React, { FormHTMLAttributes } from 'react';
import { ValidationResult } from '../../utilities/validators';

export type FormOwnProps = {
  children?: React.ReactNode;
  validationResults?: ValidationResult[];
} & FormHTMLAttributes<HTMLFormElement>;

export type FormProps = FormOwnProps;
