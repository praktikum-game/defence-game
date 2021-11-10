import React, { HTMLAttributes } from 'react';

export type ContainerHeaderOwnProps = {
  children?: React.ReactNode;
} & HTMLAttributes<HTMLElement>;

export type ContainerHeaderProps = ContainerHeaderOwnProps;
