import React from 'react';
import { Link } from 'react-router';
import { LogoProps } from './types';
import './logo.css';

export const Logo = (props: LogoProps) => (
  <Link to="/home">
    <div className="logo" {...props}></div>
  </Link>
);
