import React from 'react';
import { ButtonProps } from './types';
import { getViewTypes } from '../../utilities/utilities';
import './button.css';

const viewTypes = getViewTypes('button');

export const Button = ({
  text = 'Button',
  disabled = false,
  view = 'primary',
  loading = false,
  className = '',
  ...rest
}: ButtonProps): JSX.Element => (
  <button
    // eslint-disable-next-line
    className={`button ${viewTypes[view]}${className === '' ? className : ' ' + className}`}
    disabled={loading || disabled}
    {...rest}
  >
    {loading ? 'Загрузка...' : text}
  </button>
);
