import {
  Action,
  UserActionCreator,
  UserActions,
  UserFaliedFetch,
  UserStartFetch,
  UserSuccessFetch,
  UserThunkDispatch,
} from '../types';
import {
  USER_FAILED_FETCH_DATA,
  USER_START_FETCH_DATA,
  USER_SUCCESS_FETCH_DATA,
} from './action-types';

export function createAction<T extends string, P>(type: T, payload: P): Action<T, P> {
  return { type, payload };
}

export const userStartFetch = (): UserStartFetch => createAction(USER_START_FETCH_DATA, null);
export const userSuccessFetch = (data: string): UserSuccessFetch =>
  createAction(USER_SUCCESS_FETCH_DATA, data);
export const userFailedFetch = (): UserFaliedFetch => createAction(USER_FAILED_FETCH_DATA, null);

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
