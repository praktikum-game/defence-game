import React from 'react';
import { WindowContainerProps } from './types';
import './window-container.css';

export const WindowContainer = ({
  children,
  size = 'default',
  ...otherProps
}: WindowContainerProps): JSX.Element => {
  let className = 'windows-container';
  if (size !== 'default') {
    className += ` window-container_${size}`;
  }
  return (
    <div className={className} {...otherProps}>
      {children}
    </div>
  );
};
