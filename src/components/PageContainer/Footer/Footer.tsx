import React from 'react';
import { FooterProps } from './types';
import './footer.css';

export const Footer = ({ children, className = '', ...rest }: FooterProps): JSX.Element => (
  <div className={`footer ${className === '' ? className : ` ${className}`}`} {...rest}>
    {children}
  </div>
);
