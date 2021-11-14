import React, { HTMLAttributes } from 'react';

export type PageContainerOwnProps = {
  className?: string;
  children?: React.ReactNode;
  size?: 's' | 'm' | 'l';
} & HTMLAttributes<HTMLDivElement>;

export type PageContainerProps = PageContainerOwnProps;
