import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';

export const useAuth = (redirectIsAuth: boolean = true) => {
  const navigate = useNavigate();

  const userData = useSelector((state: AppState) => state.user.data);
  useEffect(() => {
    if (redirectIsAuth) {
      if (userData) {
        navigate('/', { replace: true });
      }
    } else if (!redirectIsAuth) {
      if (!userData) {
        navigate('/', { replace: true });
      }
    }
  }, [userData, navigate, redirectIsAuth]);
};
