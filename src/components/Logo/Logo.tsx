import React from 'react';
import block from 'bem-cn';
import { Link } from 'react-router-dom';
import { LogoProps } from './types';
import logo from './logo.svg';
import './logo.css';

const b = block('logo');

export const Logo = ({ className, ...props }: LogoProps) => (
  <Link to="/">
    <div className={b.mix(className)} {...props}>
      <img src={logo} alt="Doctors Vs Viruses" />
    </div>
  </Link>
);
