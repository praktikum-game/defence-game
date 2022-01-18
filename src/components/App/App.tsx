import React from 'react';
import { useSelector } from 'react-redux';
import { AppRoutes } from '../AppRoutes';
// import { getUserData } from '../../store/user/actions/action-creators';

import './App.css';
import '../../utilities/common.css';
import { AppState } from 'store';
import { ThemeSwitcher } from 'components/ThemeSwitcher';

export const App = () => {
  const theme = useSelector((state: AppState) => state.theme.theme);

  return (
    <div className={`App ${theme}_theme`}>
      <AppRoutes />
      <ThemeSwitcher />
    </div>
  );
};
