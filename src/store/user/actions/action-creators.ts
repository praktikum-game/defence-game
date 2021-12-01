import { LoginRequest, RegisterRequest, UserData } from '../../../api/auth';
import { ProfileUpdateRequest } from '../../../api/users';
import { UserActionCreator, UserThunkDispatch } from '../types';
import {
  UserEndFetch,
  UserFaliedFetch,
  UserStartFetch,
  UserSuccessFetch,
} from './action-creators-types';
import {
  USER_END_FETCH_DATA,
  USER_FAILED_FETCH_DATA,
  USER_START_FETCH_DATA,
  USER_SUCCESS_FETCH_DATA,
} from './actions';

// Action creators
export const userStartFetch = (): UserStartFetch => ({ type: USER_START_FETCH_DATA });
export const userSuccessFetch = (data: UserData | null): UserSuccessFetch => ({
  type: USER_SUCCESS_FETCH_DATA,
  payload: data,
});
export const userFailedFetch = (): UserFaliedFetch => ({ type: USER_FAILED_FETCH_DATA });
export const userEndFetch = (): UserEndFetch => ({ type: USER_END_FETCH_DATA });

export const userAuth: UserActionCreator =
  (loginData: LoginRequest) =>
  async (dispatch: UserThunkDispatch, _1, { api }) => {
    dispatch(userStartFetch());
    await api.auth.login(loginData);
    const userData = await api.auth.userRead();
    dispatch(userSuccessFetch(userData.data));
    dispatch(userEndFetch());
  };

export const userRegister: UserActionCreator =
  (registerData: RegisterRequest) =>
  async (dispatch: UserThunkDispatch, _1, { api }) => {
    dispatch(userStartFetch());
    await api.auth.register(registerData);
    const userData = await api.auth.userRead();
    dispatch(userSuccessFetch(userData.data));
    dispatch(userEndFetch());
  };

export const userLogout: UserActionCreator =
  () =>
  async (dispatch: UserThunkDispatch, _1, { api }) => {
    dispatch(userStartFetch());
    await api.auth.logout();
    dispatch(userSuccessFetch(null));
    dispatch(userEndFetch());
  };

export const userUpdateProfile: UserActionCreator =
  (profileData: ProfileUpdateRequest) =>
  async (dispatch: UserThunkDispatch, _1, { api }) => {
    dispatch(userStartFetch());
    const response = await api.users.updateProfile(profileData);
    dispatch(userSuccessFetch(response.data));
    dispatch(userEndFetch());
  };
