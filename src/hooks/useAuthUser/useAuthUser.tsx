import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store';
import { LoginRequest } from '../../api/auth';
import { userAuth } from '../../store/user/actions/action-creators';

export const useAuthUser = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state: AppState) => state.user.data);

  const executeAuth = async (data: LoginRequest) => {
    return dispatch(userAuth(data));
  };

  return { executeAuth, userData };
};
