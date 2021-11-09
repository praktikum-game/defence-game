import { ButtonHTMLAttributes } from 'react';

export type ButtonOwnProps = {
  text?: string;
  disabled?: boolean;
  view?: 'default' | 'primary' | 'secondary';
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = ButtonOwnProps;
