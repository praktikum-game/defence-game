import React from 'react';
import block from 'bem-cn';
import { ButtonProps } from './types';
import { getViewTypes } from '../../utilities';
import './button.css';

const viewTypes = getViewTypes('button');
const b = block('button');

export const Button = ({
  text = 'Button',
  disabled = false,
  view = 'primary',
  loading = false,
  className,
  isSmall = false,
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    className={b({ small: isSmall }).mix(viewTypes[view]).mix(className)}
    disabled={loading || disabled}
    type={type}
    {...props}
  >
    {loading ? 'Загрузка...' : text}
  </button>
);
