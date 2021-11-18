import React, { FormHTMLAttributes } from 'react';
import { ValidationResult } from '../../utilities/validators';

export type FormOwnProps = {
  children?: React.ReactNode;
  validationResults?: ValidationResult[];
  controllerCallback?: (data: FormData) => Promise<unknown>;
  resetValuesCallback?: () => void;
  setSubmitResult?: (value: boolean) => void;
  isResetForm?: boolean;
  className?: string;
} & FormHTMLAttributes<HTMLFormElement>;

export type FormProps = FormOwnProps;
