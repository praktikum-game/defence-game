import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRoutes } from '../AppRoutes';

import './App.css';
import '../../utilities/common.css';
import { AppState } from 'store';
import { ThemeSwitcher } from 'components/ThemeSwitcher';
import { switchTheme } from 'store/theme/actions/action-creators';

export const App = () => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const dispatch = useDispatch();
  const handleClick = useCallback(() => dispatch(switchTheme()), [dispatch]);

  return (
    <div className={`App ${theme}_theme`}>
      <AppRoutes />
      <ThemeSwitcher theme={theme} onClick={handleClick} />
    </div>
  );
};
