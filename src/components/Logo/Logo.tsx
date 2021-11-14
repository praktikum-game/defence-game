import React from 'react';
import { Link } from 'react-router-dom';
import { LogoProps } from './types';
import logo from './logo.svg';
import './logo.css';

export const Logo = (props: LogoProps) => (
  <Link to="/">
    <div className="logo" {...props}>
      <img src={logo} alt="Doctors Vs Viruses" />
    </div>
  </Link>
);
