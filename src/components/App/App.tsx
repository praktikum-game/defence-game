import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRoutes } from '../AppRoutes';
import { getUserData } from '../../store/user/actions/action-creators';

import './App.css';
import '../../utilities/common.css';
import { AppState } from 'store';

export const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: AppState) => state.theme.theme);
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <div className={`App ${theme}_theme`}>
      <AppRoutes />
    </div>
  );
};
