import React from 'react';
import { Link } from 'react-router-dom';
import { LogoProps } from './types';
import logo from './logo.svg';
import './logo.css';

export const Logo = (props: LogoProps) => (
  <Link to="/home">
    <div className="logo" {...props}>
      <img src={logo} alt="Logo" />
    </div>
  </Link>
);
