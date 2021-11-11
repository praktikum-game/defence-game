import React from 'react';
import './title.css';
import { TitleProps } from './types';

export const Title = ({
  headingLevel = 5,
  align = 'center',
  ...otherProps
}: TitleProps): JSX.Element => {
  const Component = `h${headingLevel}`;
  return <Component className={`title title_${align}`} {...otherProps}></Component>;
};
