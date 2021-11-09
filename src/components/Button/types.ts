import { ButtonHTMLAttributes } from 'react';
import { ViewType } from 'utilities/types';

export type ButtonOwnProps = {
  text?: string;
  disabled?: boolean;
  view?: keyof ViewType;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = ButtonOwnProps;
