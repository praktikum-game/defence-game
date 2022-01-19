import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';

export const useAvatar = () => {
  const userData = useSelector((state: AppState) => state.user.data);

  const getAvatar = useCallback(() => {
    if (userData !== null) {
      return userData.avatar === '' ? undefined : userData.avatar;
    }
  }, [userData]);

  return { getAvatar };
};
