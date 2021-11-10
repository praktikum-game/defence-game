import React, { HTMLAttributes } from 'react';

export type PageContainerOwnProps = {
  children?: React.ReactNode;
  size?: "narrow" | "default" | "wide"
} & HTMLAttributes<HTMLDivElement>;

export type PageContainerProps = PageContainerOwnProps;
