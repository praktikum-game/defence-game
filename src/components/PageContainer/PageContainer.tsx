import React from 'react';
import block from 'bem-cn';
import { PageContainerProps } from './types';
import './page-container.css';

const b = block('page-container');

export const PageContainer = ({
  children,
  size = 'm',
  className,
  ...props
}: PageContainerProps): JSX.Element => (
  <div
    className={b({ [size]: true })
      .mix(className)
      .mix('center-horizontal')}
    {...props}
  >
    {children}
  </div>
);
