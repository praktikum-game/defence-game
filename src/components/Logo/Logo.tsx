import React from 'react';
import block from 'bem-cn';
import { Link } from 'react-router-dom';
import { LogoProps } from './types';
import logo from './logo.svg';
import './logo.css';

const b = block('logo');

export const Logo = ({ className, ...props }: LogoProps) => (
  <div className={b.mix(className)} {...props}>
    <Link to="/">
      <img src={logo} alt="Doctors Vs Viruses" />
    </Link>
  </div>
);
