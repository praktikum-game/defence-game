import { ButtonHTMLAttributes } from 'react';
import { ViewType } from '../../utilities/types';

export type ButtonOwnProps = {
  className?: string;
  text?: string;
  disabled?: boolean;
  view?: keyof ViewType;
  loading?: boolean;
  isSmall?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = ButtonOwnProps;
