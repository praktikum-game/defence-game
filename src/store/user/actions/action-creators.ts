import { UserActionCreator, UserThunkDispatch } from '../types';
import { UserFaliedFetch, UserStartFetch, UserSuccessFetch } from './action-creators-types';
import { USER_FAILED_FETCH_DATA, USER_START_FETCH_DATA, USER_SUCCESS_FETCH_DATA } from './actions';

// Action creators
export const userStartFetch = (): UserStartFetch => ({ type: USER_START_FETCH_DATA });
export const userSuccessFetch = (data: string): UserSuccessFetch => ({
  type: USER_SUCCESS_FETCH_DATA,
  payload: data,
});
export const userFailedFetch = (): UserFaliedFetch => ({ type: USER_FAILED_FETCH_DATA });

// async action creators
export const fetchUserData: UserActionCreator = () => async (dispatch: UserThunkDispatch) => {
  dispatch(userStartFetch());
  try {
    const result = await Promise.resolve('fetched data');

    dispatch(userSuccessFetch(result));
  } catch (e) {
    dispatch(userFailedFetch());
  }
};
