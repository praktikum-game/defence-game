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
  ...rest
}: ButtonProps): JSX.Element => (
  <button className={`button ${viewTypes[view]}`} disabled={loading || disabled} {...rest}>
    {loading ? 'Загрузка...' : text}
  </button>
);
