import { NavigationItem } from './types';

export const defaultNavigation: NavigationItem[] = [
  {
    path: '/',
    name: 'Главная',
  },
  {
    path: '/profile',
    name: 'Профиль',
  },
  {
    path: '/login',
    name: 'Логин',
  },
  {
    path: '/register',
    name: 'Регистрация',
  },
  {
    path: '/game',
    name: 'Игра',
  },
  {
    path: '/ratings',
    name: 'Таблица игроков',
  },
  {
    path: '/forum',
    name: 'Форум',
  },
  {
    path: '/forum/123',
    name: 'Раздел форума',
  },
  {
    path: '/500',
    name: 'Ошибка 500',
  },
  {
    path: '/404',
    name: 'Ошибка 404',
  },
];
