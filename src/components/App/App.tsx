import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppRoutes } from '../AppRoutes';
import { getUserData } from '../../store/user/actions/action-creators';

import './App.css';
import '../../utilities/common.css';
import { privateRoute } from '../PrivateRoute';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const PrivateRoutes = privateRoute(AppRoutes);

  return (
    <div className="App">
      <PrivateRoutes />
    </div>
  );
};
