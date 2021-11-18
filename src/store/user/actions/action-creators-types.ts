import { USER_FAILED_FETCH_DATA, USER_START_FETCH_DATA, USER_SUCCESS_FETCH_DATA } from './actions';

export interface UserStartFetch {
  type: typeof USER_START_FETCH_DATA;
}
export interface UserSuccessFetch {
  type: typeof USER_SUCCESS_FETCH_DATA;
  payload: string;
}
export interface UserFaliedFetch {
  type: typeof USER_FAILED_FETCH_DATA;
}

export type UserActions = UserStartFetch | UserSuccessFetch | UserFaliedFetch;
