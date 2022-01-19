import { Theme } from 'store/theme/types';

export const backendStaticUrl = 'https://ya-praktikum.tech/api/v2/resources';
export const LEADERBOARD_TEAM_NAME = 'defence-game';
export const LEADERBOARD_EMPTY_USERNAME_PLACEHOLDER = '<unknown>';
export const THEME_TYPES: Record<Theme, number> = {
  dark: 2,
  light: 1,
};

export enum InputNames {
  FIRST_NAME = 'first_name',
  EMAIL = 'email',
  SECOND_NAME = 'second_name',
  DISPLAY_NAME = 'display_name',
  PHONE = 'phone',
  PASSWORD = 'password',
  LOGIN = 'login',
  OLD_PASSWORD = 'old_password',
  NEW_PASSWORD = 'new_password',
  REPEAT_PASSWORD = 'repeat_password',
  AVATAR = 'avatar',
}

export const STORAGE_LEADER_KEY = 'currentLeader';
