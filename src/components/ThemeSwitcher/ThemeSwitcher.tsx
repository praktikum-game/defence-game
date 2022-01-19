import React from 'react';
import block from 'bem-cn';

import { ThemeSwitcherProps } from './types';

import './theme-switcher.css';

const b = block('theme-switcher');

export const ThemeSwitcher = ({ theme, onClick, ...props }: ThemeSwitcherProps) => {
  return (
    <button
      className={b({ dark: theme === 'dark', light: theme === 'light' }).mix(props.className)}
      onClick={onClick}
    ></button>
  );
};
