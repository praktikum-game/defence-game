import React from 'react';
import { Outlet } from 'react-router-dom';

export const ForumPage = (): JSX.Element => (
  <>
    <h1>Форум</h1>
    <Outlet />
  </>
);
