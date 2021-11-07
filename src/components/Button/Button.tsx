import React, { FC } from 'react';

import './button.css';

type Props = {
  text?: string;
  onClick: () => void;
  disabled?: boolean;
  view?: 'default' | 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
};

const viewTypes = {
  default: 'button--default',
  primary: 'button--primary',
  secondary: 'button--secondary',
};

const Button: FC<Props> = ({
  text = 'Button',
  disabled = false,
  view = 'default',
  loading = false,
  ...rest
}) => (
  <button
    className={`button ${viewTypes[view]}`}
    onClick={rest.onClick}
    disabled={loading || disabled}
  >
    {(loading && <i className="fas fa-spinner fa-spin"></i>) || text}
  </button>
);

export default Button;
