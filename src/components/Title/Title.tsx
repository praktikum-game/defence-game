import React from 'react';
import './title.css';
import { TitleProps } from './types';

export const Title = ({
  headingLevel = 5,
  align = 'center',
  className_ = '',
  ...otherProps
}: TitleProps): JSX.Element => {
  const Component = `h${headingLevel}`;
  const className = className_ === '' ? '' : ` ${className_}`;
  return <Component className={`title title_${align}${className}`} {...otherProps}></Component>;
};
