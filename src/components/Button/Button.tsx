import React, { FC } from 'react';
import { ButtonProps } from './types';

import './button.css';

const viewTypes = {
  default: 'button_default',
  primary: 'button_primary',
  secondary: 'button_secondary',
};

export const Button: FC<ButtonProps> = ({
  text = 'Button',
  disabled = false,
  view = 'default',
  loading = false,
  ...rest
}) => (
  <button className={`button ${viewTypes[view]}`} disabled={loading || disabled} {...rest}>
    {loading ? 'Загрузка...' : text}
  </button>
);
