import React from 'react';
import './title.css';
import { TitleProps } from './types';

export const Title = ({ headingLevel = 1, ...otherProps }: TitleProps): JSX.Element => {
  const CustomHeading = `h${headingLevel}`;
  return <CustomHeading className="title" {...otherProps}></CustomHeading>;
};
