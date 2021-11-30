import { UserActions } from './actions/action-creators-types';
import {
  USER_START_FETCH_DATA,
  USER_SUCCESS_FETCH_DATA,
  USER_END_FETCH_DATA,
} from './actions/actions';
import { UserState } from './types';

const initialState: UserState = {
  data: null,
  loading: false,
};

export function reducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case USER_START_FETCH_DATA:
      return { ...state, loading: true };
    case USER_SUCCESS_FETCH_DATA:
      return { ...state, loading: false, data: action.payload };
    case USER_END_FETCH_DATA:
      return { ...state, loading: false };

    default:
      return state;
  }
}
