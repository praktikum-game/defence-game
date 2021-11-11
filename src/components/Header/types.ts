import React, { HTMLAttributes } from 'react';

export type HeaderOwnProps = {
  children?: React.ReactNode;
} & HTMLAttributes<HTMLElement>;

export type HeaderProps = HeaderOwnProps;
