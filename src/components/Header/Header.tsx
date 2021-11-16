import React from 'react';
import block from 'bem-cn';
import { HeaderProps } from './types';
import './header.css';
import { BackButton } from './BackButton';

const b = block('header');

export const Header = ({
  children,
  size = 'l',
  backButton = false,
  className,
  ...props
}: HeaderProps) => (
  <header className={b({ [size]: true }).mix(className)} {...props}>
    {backButton ? <BackButton /> : ''}
    {children}
  </header>
);
