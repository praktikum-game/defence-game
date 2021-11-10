import React from 'react';
import { ContainerHeaderProps } from './types';
import './container-header.css';

export const ContainerHeader = ({ children, ...otherProps }: ContainerHeaderProps): JSX.Element => (
  <header className="container-header" {...otherProps}>
    {children}
  </header>
);
