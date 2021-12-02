import React from 'react';
import { Outlet } from 'react-router-dom';

export const ForumPage = () => (
  <div className="forum-layout-container">
    <Outlet />
  </div>
);
