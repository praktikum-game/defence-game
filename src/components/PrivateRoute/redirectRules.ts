import { RedirectRules } from './types';

export const redirectRules: RedirectRules = {
  '/login': { path: '/', redirectIfAuthorized: true },
  '/register': { path: '/', redirectIfAuthorized: true },
  '/password-edit': { path: '/login', redirectIfAuthorized: false },
  '/profile-edit': { path: '/login', redirectIfAuthorized: false },
  '/profile': { path: '/login', redirectIfAuthorized: false },
  '/game': { path: '/login', redirectIfAuthorized: false },
  '/forum': { path: '/login', redirectIfAuthorized: false },
};
