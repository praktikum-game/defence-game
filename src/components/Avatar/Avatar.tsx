import React from 'react';
import block from 'bem-cn';
import { AvatarProps } from './types';
import './avatar.css';
import defaultAvatar from './static/default-avatar.svg';

const b = block('avatar');

export const Avatar = ({ src = defaultAvatar, className, ...props }: AvatarProps) => {
  return (
    <img className={b.mix(className)} src={src === null ? defaultAvatar : src} {...props}></img>
  );
};
