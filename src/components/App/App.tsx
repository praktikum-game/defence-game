import React, { useEffect } from 'react';
import { AppRoutes } from '../AppRoutes';
import { AuthController } from '../../controllers';
import './App.css';
import '../../utilities/common.css';

export const App = () => {
  useEffect(() => {
    AuthController.userRead().then(() => {

    });
  });

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};
