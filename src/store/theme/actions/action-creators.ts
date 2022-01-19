import { Theme, ThemeActionCreator, ThemeThunkDispatch } from '../types';
import { CHANGE_THEME } from './action';
import { ThemeChangeSuccess } from './action-creators-types';

export const themeChange = (theme: Theme): ThemeChangeSuccess => ({
  type: CHANGE_THEME,
  payload: theme,
});

export const switchTheme: ThemeActionCreator =
  () =>
  async (dispatch: ThemeThunkDispatch, getState, { api }) => {
    const { user, theme } = getState();
    let newTheme: Theme = 'light';
    if (theme.theme === 'light') {
      newTheme = 'dark';
    }
    dispatch(themeChange(newTheme));

    if (user.data) {
      await api.dbUsers.setUserTheme(user.data.id, newTheme);
    }
  };
