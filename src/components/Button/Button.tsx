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
  ...props
}: ButtonProps) => (
  <button
    className={b
      .mix(viewTypes[view])
      .mix(b({ small: isSmall }))
      .mix(className)}
    disabled={loading || disabled}
    {...props}
  >
    {loading ? 'Загрузка...' : text}
  </button>
);
