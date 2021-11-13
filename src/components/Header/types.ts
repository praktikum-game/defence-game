import React, { HTMLAttributes } from 'react';

export type HeaderOwnProps = {
  children?: React.ReactNode;
  size?: 's' | 'l';
} & HTMLAttributes<HTMLElement>;

export type HeaderProps = HeaderOwnProps;
