import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthUser } from '../../hooks/useAuthUser';
import { RequireAuthProps } from './types';

// Опасно вот хардкодить путь. Если он поменяется, то забудем. Лучше бы вынести
// в отдельное место все пути
export const RequireAuth = ({ children, to = '/login', inverse = false }: RequireAuthProps) => {
  const { userData } = useAuthUser();
  const location = useLocation();

  if (!inverse && !userData) {
    return <Navigate replace to={to} state={{ from: location }} />;
  }

  if (inverse && userData) {
    return <Navigate replace to={to} state={{ from: location }} />;
  }


  return <>{children}</>;
};
