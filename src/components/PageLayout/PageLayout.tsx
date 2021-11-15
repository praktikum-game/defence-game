import block from 'bem-cn';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Logo } from '../Logo';
import './pageLayout.css';
import { PageLayoutProps } from './types';

const b = block('page-layout');

export const PageLayout = ({ className }: PageLayoutProps): JSX.Element => (
  <div className={b.mix(className)}>
    <Logo />
    <Outlet />
  </div>
);
