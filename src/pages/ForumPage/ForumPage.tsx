import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';

export const ForumPage = () => {
  useAuthRedirect('/login');
  return (
    <div className="forum-layout-container">
      <Outlet />
    </div>
  );
};
