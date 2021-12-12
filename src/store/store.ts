import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import { userReducer } from './user';
import { leaderboardReducer } from './leaderboard';
import { ThunkExtraArgument } from './types';
import { authAPI } from '../api/auth';
import { leaderboardAPI } from '../api/leaderboard';
import { usersAPI } from '../api/users';

export function configureStore(initialState = {}) {
  const thunkExtraArgument: ThunkExtraArgument = {
    api: {
      auth: authAPI,
      leaderboard: leaderboardAPI,
      users: usersAPI,
    },
  };

  const rootReducer = combineReducers({
    user: userReducer,
    leaderboard: leaderboardReducer,
  });

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk.withExtraArgument(thunkExtraArgument)),
  );

  return store;
}
