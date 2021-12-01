import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppRoutes } from '../AppRoutes';
import { getUserData } from '../../store/user/actions/action-creators';

import './App.css';
import '../../utilities/common.css';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};
