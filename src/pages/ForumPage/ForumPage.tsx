import React from 'react';
import { Outlet } from 'react-router-dom';

import './forum-page.css';

export const ForumPage = () => (
  <div className="forum-layout-container">
    <Outlet />
  </div>
);
