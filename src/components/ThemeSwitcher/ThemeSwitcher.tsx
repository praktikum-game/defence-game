import React, { useCallback } from 'react';
import block from 'bem-cn';

import './theme-switcher.css';
import { useDispatch, useSelector } from 'react-redux';
import { switchTheme } from 'store/theme/actions/action-creators';
import { AppState } from 'store';
import { ThemeSwitcherProps } from './types';

const b = block('theme-switcher');

export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const dispatch = useDispatch();
  const handleClick = useCallback(() => dispatch(switchTheme()), [dispatch]);

  return (
    <button
      className={b({ dark: theme === 'dark', light: theme === 'light' }).mix(props.className)}
      onClick={handleClick}
    ></button>
  );
};
