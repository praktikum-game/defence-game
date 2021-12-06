import React from 'react';
import block from 'bem-cn';
import { FooterProps } from './types';
import './footer.css';

const b = block('footer');

export const Footer = ({ children, className, ...props }: FooterProps) => (
  <div className={b.mix(className)} {...props}>
    {children}
  </div>
);
