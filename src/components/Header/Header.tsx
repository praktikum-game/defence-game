import React from 'react';
import { HeaderProps } from './types';
import './header.css';

export const Header = ({ children, ...otherProps }: HeaderProps): JSX.Element => (
  <header className="header" {...otherProps}>
    {children}
  </header>
);
