import { HTMLAttributes } from 'react';

export type TitleOwnProps = {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
} & HTMLAttributes<HTMLHeadingElement>;

export type TitleProps = TitleOwnProps;
