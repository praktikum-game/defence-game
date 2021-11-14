import React from 'react';
import { PageContainerProps } from './types';
import './page-container.css';

export const PageContainer = ({
  children,
  size = 'm',
  className = '',
  ...otherProps
}: PageContainerProps): JSX.Element => (
  <div
    className={`page-container page-container_${size} center-horizontal${
      className === '' ? className : ` ${className}`
    }`}
    {...otherProps}
  >
    {children}
  </div>
);
