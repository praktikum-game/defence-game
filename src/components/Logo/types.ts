import { HTMLAttributes } from 'react';

export type LogoOwnProps = {
  className?: string;
} & HTMLAttributes<HTMLElement>;

export type LogoProps = LogoOwnProps;
