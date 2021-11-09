import React, { FormHTMLAttributes } from 'react';

export type FormOwnProps = {
  submitText?: string
  children?: React.ReactNode
} & FormHTMLAttributes<HTMLFormElement>;

export type FormProps = FormOwnProps;
