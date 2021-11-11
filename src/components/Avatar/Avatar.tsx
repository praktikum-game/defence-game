import React from 'react';
import { AvatarProps } from './types';
import './avatar.css';
import defaultAvatar from './static/default-avatar.png';

export const Avatar = ({ src = defaultAvatar, ...otherProps }: AvatarProps): JSX.Element => (
  <img className="avatar" src={src} {...otherProps}></img>
);
