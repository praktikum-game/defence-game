import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { ProfileEditPage } from '../../pages/ProfilePage';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { RegisterPage } from '../../pages/RegisterPage';
import { GamePage } from '../../pages/GamePage';
import { RatingsPage } from '../../pages/RatingsPage';
import { ForumPage } from '../../pages/ForumPage';
import { ForumThreadPage } from '../../pages/ForumPage/ForumThreadPage';
import { ForumIndexPage } from '../../pages/ForumPage/ForumIndexPage';
import { ErrorPage404 } from '../../pages/ErrorPage404';
import { ErrorPage500 } from '../../pages/ErrorPage500';
import { PageLayout } from '../PageLayout';
import { PasswordEditPage } from '../../pages/PasswordEditPage';
import { AppLayout } from '../AppLayout';
import { RequireAuth } from '../RequireAuth';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        element: <PageLayout />,
        children: [
          {
            path: '/profile',
            element: (
              <RequireAuth>
                <ProfileEditPage />
              </RequireAuth>
            ),
          },
          {
            path: '/password-edit',
            element: (
              <RequireAuth>
                <PasswordEditPage />
              </RequireAuth>
            ),
          },
          {
            path: '/login',
            element: (
              <RequireAuth to="/" inverse>
                <LoginPage />
              </RequireAuth>
            ),
          },
          {
            path: '/register',
            element: (
              <RequireAuth to="/" inverse>
                <RegisterPage />
              </RequireAuth>
            ),
          },
          {
            path: '/game',
            element: (
              <RequireAuth>
                <GamePage />
              </RequireAuth>
            ),
          },
          {
            path: '/ratings',
            element: <RatingsPage />,
          },
          {
            path: '/forum',
            element: <ForumPage />,
            children: [
              {
                index: true,
                element: <ForumIndexPage />,
              },
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
    ],
  },
];
