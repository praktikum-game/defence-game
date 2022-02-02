import { LoginIcon } from '../icons/LoginIcon';
import React from 'react';
import { GameIcon } from '../icons/GameIcon';
import { NavigationItem } from './types';
import { ProfileIcon } from '../icons/ProfileIcon';
import { ForumIcon } from '../icons/ForumIcon';
import { RegisterIcon } from 'components/icons/RegisterIcon';
import { RatingIcon } from 'components/icons/RatingIcon';
import { HomeIcon } from 'components/icons/HomeIcon';

export const defaultNavigation: NavigationItem[] = [
  {
    path: '/',
    name: 'Главная',
    showFor: {
      signed: true,
      anonim: true,
    },
    icon: <HomeIcon />,
  },
  {
    path: '/profile?type=view',
    name: 'Профиль',
    showFor: {
      signed: true,
      anonim: false,
    },
    icon: <ProfileIcon />,
  },
  {
    path: '/login',
    name: 'Войти',
    showFor: {
      signed: false,
      anonim: true,
    },
    icon: <LoginIcon />,
  },
  {
    path: '/register',
    name: 'Регистрация',
    showFor: {
      signed: false,
      anonim: true,
    },
    icon: <RegisterIcon />,
  },
  {
    path: '/game',
    name: 'Игра',
    showFor: {
      signed: true,
      anonim: false,
    },
    icon: <GameIcon />,
  },
  {
    path: '/ratings',
    name: 'Таблица игроков',
    showFor: {
      signed: true,
      anonim: true,
    },
    icon: <RatingIcon />,
  },
  {
    path: '/forum',
    name: 'Форум',
    showFor: {
      signed: true,
      anonim: true,
    },
    icon: <ForumIcon />,
  },
];
