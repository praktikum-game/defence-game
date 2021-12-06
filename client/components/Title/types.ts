import { HTMLAttributes } from 'react';

export type TitleOwnProps = {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  align?: 'left' | 'center' | 'right';
  className_?: string;
} & HTMLAttributes<HTMLHeadingElement>;

export type TitleProps = TitleOwnProps;
