import React, { useEffect } from 'react';
import { AppRoutes } from '../AppRoutes';
import { authController } from '../../controllers';
import './App.css';
import '../../utilities/common.css';

export const App = () => {
  useEffect(() => {
    authController.userRead().then(() => {});
  });

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};
