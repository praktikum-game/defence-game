import React from 'react';
import block from 'bem-cn';
import { useSelector } from 'react-redux';
import { AvatarProps } from './types';
import { AppState } from '../../store';
import './avatar.css';
import defaultAvatar from './static/default-avatar.svg';

const b = block('avatar');

export const Avatar = ({ src, className, ...props }: AvatarProps) => {
  const userData = useSelector((state: AppState) => state.user.data);
  let srcFull = defaultAvatar;
  if (userData !== null) {
    srcFull =
      src === undefined
        ? userData.avatar !== ''
          ? userData.avatar
          : defaultAvatar
        : defaultAvatar;
  }

  return <img className={b.mix(className)} src={srcFull} {...props}></img>;
};
