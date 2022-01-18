import { Theme } from '../types';
import { CHANGE_THEME } from './action';

export interface ThemeChangeSuccess {
  type: typeof CHANGE_THEME;
  payload: Theme;
}

export type ThemeActions = ThemeChangeSuccess;
