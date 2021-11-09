import React from 'react';
import './link.css';
import { LinkFC } from './types';

export const Link: LinkFC = ({ children, ...otherProps }) => (
  <a className="link" {...otherProps}>
    {children}
  </a>
);
