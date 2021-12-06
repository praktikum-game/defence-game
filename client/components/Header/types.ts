import React, { HTMLAttributes } from 'react';

export type HeaderOwnProps = {
  className?: string;
  children?: React.ReactNode;
  size?: 's' | 'l';
  backButton?: boolean;
} & HTMLAttributes<HTMLElement>;

export type HeaderProps = HeaderOwnProps;
