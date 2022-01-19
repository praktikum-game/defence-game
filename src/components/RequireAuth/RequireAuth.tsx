import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthUser } from '../../hooks/useAuthUser';
import { RequireAuthProps } from './types';

// Ненадежно вот так хардкодить путь. Если он поменяется, то забудем. Лучше бы вынести
// в отдельное место все пути
export const RequireAuth = ({ children, to = '/login', inverse = false }: RequireAuthProps) => {
  const { userData } = useAuthUser();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!inverse && !userData) {
      navigate(to, { replace: true, state: { from: location } });
    }

    if (inverse && userData) {
      navigate(to, { replace: true, state: { from: location } });
    }
  });

  return children;
};
