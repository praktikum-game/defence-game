import React from 'react';
import { Outlet } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';

import './forum-page.css';



export const ForumPage = () => {
  // useAuth(false);
  return (
    <div className="forum-layout-container">
      <Outlet />
    </div>
  );
};
