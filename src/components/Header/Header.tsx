import React from 'react';
import { HeaderProps } from './types';
import './header.css';
import { BackButton } from './BackButton';

export const Header = ({
  children,
  size = 'l',
  backButton = false,
  className = '',
  ...otherProps
}: HeaderProps): JSX.Element => (
  <header
    // eslint-disable-next-line
    className={`header header_${size} ${className === '' ? className : ' ' + className}`}
    {...otherProps}
  >
    {backButton ? <BackButton /> : ''}
    {children}
  </header>
);
