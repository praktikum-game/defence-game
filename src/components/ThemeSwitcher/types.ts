import { Theme } from 'store/theme/types';

export type ThemeSwitcherProps = {
  className?: string;
  theme: Theme;
  onClick: () => void;
};
