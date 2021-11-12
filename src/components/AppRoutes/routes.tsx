import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { ProfilePage } from '../../pages/ProfilePage';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { RegisterPage } from '../../pages/RegisterPage';
import { GamePage } from '../../pages/GamePage';
import { RatingsPage } from '../../pages/RatingsPage';
import { ForumPage } from '../../pages/ForumPage';
import { ForumThreadPage } from '../../pages/ForumPage/components/ForumThreadPage';
import { ForumIndexPage } from '../../pages/ForumPage/components/ForumIndexPage';
import { ErrorPage404 } from '../../pages/ErrorPage404';
import { ErrorPage500 } from '../../pages/ErrorPage500';
import { PageLayout } from '../PageLayout';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PageLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/game',
        element: <GamePage />,
      },
      {
        path: '/ratings',
        element: <RatingsPage />,
      },
      {
        path: '/forum',
        element: <ForumPage />,
        children: [
          { index: true, element: <ForumIndexPage /> },
          {
            path: ':forumId',
            element: <ForumThreadPage />,
          },
        ],
      },
      {
        path: '500',
        element: <ErrorPage500 />,
      },
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '*',
        element: <ErrorPage404 />,
      },
    ],
  },
];
