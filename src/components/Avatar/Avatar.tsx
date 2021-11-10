import React from 'react';
import { AvatarProps } from './types';
import './avatar.css';

export const Avatar = (props: AvatarProps): JSX.Element => (
  <img className="avatar" {...props}></img>
);
