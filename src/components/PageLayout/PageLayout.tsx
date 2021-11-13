import React from 'react';
import { Outlet } from 'react-router-dom';
import { Logo } from '../Logo';
import './pageLayout.css';

export const PageLayout = (): JSX.Element => (
  <div className="page-layout">
    <Logo />
    <Outlet />
  </div>
);
