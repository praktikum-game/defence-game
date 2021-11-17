import block from 'bem-cn';
import React from 'react';
import './title.css';
import { TitleProps } from './types';

const b = block('title');

export const Title = ({ headingLevel = 5, align = 'center', className_, ...props }: TitleProps) => {
  const Component = `h${headingLevel}`;
  return <Component className={b({ [align]: true }).mix(className_)} {...props}></Component>;
};
