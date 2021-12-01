import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';

export const useAuthRedirect = (path = '/', redirectIfAuthorized = false) => {
  const navigate = useNavigate();

  const userData = useSelector((state: AppState) => state.user.data);

  useEffect(() => {
    // Нам нужны два режима работы. Либо мы редиректим, когда есть авторизация.
    // Либо же наоборот, когда ее нет.
    if (redirectIfAuthorized && userData) {
      navigate(path, { replace: true });
    } else if (!redirectIfAuthorized && !userData) {
      navigate(path, { replace: true });
    }
  }, [userData, navigate, path, redirectIfAuthorized]);
};
