import { ImgHTMLAttributes } from 'react';

export type AvatarOwnProps = {
  className?: string;
} & ImgHTMLAttributes<HTMLImageElement>;

export type AvatarProps = AvatarOwnProps;
