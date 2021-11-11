import { ImgHTMLAttributes } from 'react';

export type AvatarOwnProps = {
  additionalClasses?: string[];
} & ImgHTMLAttributes<HTMLImageElement>;

export type AvatarProps = AvatarOwnProps;
