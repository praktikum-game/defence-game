import React from 'react';
import { PageContainerProps } from './types';
import './page-container.css';

export const PageContainer = ({
  children,
  size = 'm',
  ...otherProps
}: PageContainerProps): JSX.Element => (
  <div className={`page-container page-container_${size} center-horizontal`} {...otherProps}>
    {children}
  </div>
);
