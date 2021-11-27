import { UserActionCreator, UserThunkDispatch } from '../types';
import {
  UserActions,
  UserFaliedFetch,
  UserStartFetch,
  UserSuccessFetch,
} from './action-creators-types';
import { USER_FAILED_FETCH_DATA, USER_START_FETCH_DATA, USER_SUCCESS_FETCH_DATA } from './actions';

// export function createAction<T extends string, P>(type: T, payload: P): Action<T, P> {
//   return { type, payload };
// }

// export const userStartFetch = (): UserStartFetch => createAction(USER_START_FETCH_DATA, null);
// export const userSuccessFetch = (data: string): UserSuccessFetch =>
//   createAction(USER_SUCCESS_FETCH_DATA, data);
// export const userFailedFetch = (): UserFaliedFetch => createAction(USER_FAILED_FETCH_DATA, null);

// Action creators
export const userStartFetch = (): UserStartFetch => ({ type: USER_START_FETCH_DATA });
export const userSuccessFetch = (data: string): UserSuccessFetch => ({
  type: USER_SUCCESS_FETCH_DATA,
  payload: data,
});
export const userFailedFetch = (): UserFaliedFetch => ({ type: USER_FAILED_FETCH_DATA });

// async action creators
export const fetchUserData: UserActionCreator =
  () =>
  async (dispatch: UserThunkDispatch): Promise<UserActions | void> => {
    dispatch(userStartFetch());
    try {
      const result = await Promise.resolve('fetched data');

      return await dispatch(userSuccessFetch(result));
    } catch (e) {
      dispatch(userFailedFetch());
      return undefined;
    }
  };
