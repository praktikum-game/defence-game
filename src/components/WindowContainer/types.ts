import React, { HTMLAttributes } from 'react';

export type WindowContainerOwnProps = {
  children?: React.ReactNode;
  size?: "narrow" | "default" | "wide"
} & HTMLAttributes<HTMLDivElement>;

export type WindowContainerProps = WindowContainerOwnProps;
