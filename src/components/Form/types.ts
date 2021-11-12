import React, { FormHTMLAttributes } from 'react';

export type FormOwnProps = {
  children?: React.ReactNode;
} & FormHTMLAttributes<HTMLFormElement>;

export type FormProps = FormOwnProps;
