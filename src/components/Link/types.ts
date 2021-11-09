import { AnchorHTMLAttributes, FC } from 'react';

export type LinkOwnProps = {} & AnchorHTMLAttributes<HTMLAnchorElement>;

export type LinkProps = LinkOwnProps;

export type LinkFC = FC<LinkProps>;
