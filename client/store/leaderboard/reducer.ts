import { LeaderboardActions } from './actions/action-creators-types';
import { LeaderboardState } from './types';

const initialState: LeaderboardState = {
  usersList: [],
  loading: false,
};

export function reducer(state = initialState, actions: LeaderboardActions): LeaderboardState {
  switch (actions.type) {
    case 'LB_PENDING_FETCH_LIST_DATA':
      return { ...state, loading: true };
    case 'LB_SUCCESS_FETCH_LIST_DATA':
      return { ...state, usersList: actions.payload };
    case 'LB_FINISH_FETCH_LIST_DATA':
      return { ...state, loading: false };
    default:
      return state;
  }
}
