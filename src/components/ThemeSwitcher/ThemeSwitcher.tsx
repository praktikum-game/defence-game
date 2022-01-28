import React from 'react';
import block from 'bem-cn';

import { ThemeSwitcherProps } from './types';

import './theme-switcher.css';
import { SunIcon } from 'components/icons/SunIcon';
import { MoonIcon } from 'components/icons/MoonIcon';

const b = block('theme-switcher');

export const ThemeSwitcher = ({ theme, onClick, ...props }: ThemeSwitcherProps) => {
  return (
    <span className={b({ [theme]: true }).mix(props.className)} onClick={onClick}>
      {theme === 'light' ? <SunIcon theme={theme} /> : <MoonIcon theme={theme} />}
    </span>
  );
};
