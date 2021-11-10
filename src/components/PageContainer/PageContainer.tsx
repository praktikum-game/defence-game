import React from 'react';
import { PageContainerProps } from './types';
import './page-container.css';

export const PageContainer = ({
  children,
  size = 'default',
  ...otherProps
}: PageContainerProps): JSX.Element => {
  let className = 'page-container';
  if (size !== 'default') {
    className += ` page-container_${size}`;
  }
  return (
    <div className={className} {...otherProps}>
      {children}
    </div>
  );
};
