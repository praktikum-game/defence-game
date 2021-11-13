import React from 'react';
import { HeaderProps } from './types';
import './header.css';

export const Header = ({ children, size = 'l', ...otherProps }: HeaderProps): JSX.Element => (
  <header className={`header header_${size}`} {...otherProps}>
    {children}
  </header>
);
