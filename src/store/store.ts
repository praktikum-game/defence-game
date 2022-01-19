import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import { userReducer } from './user';
import { leaderboardReducer } from './leaderboard';
import { ThunkExtraArgument } from './types';
import { authAPI } from '../api/auth';
import { leaderboardAPI } from '../api/leaderboard';
import { usersAPI } from '../api/users';
import { themeReducer } from './theme';
import { usersDbAPI } from 'api/db-users';

export const rootReducer = combineReducers({
  user: userReducer,
  leaderboard: leaderboardReducer,
  theme: themeReducer,
});

export function configureStore(initialState = {}) {
  const thunkExtraArgument: ThunkExtraArgument = {
    api: {
      auth: authAPI,
      leaderboard: leaderboardAPI,
      users: usersAPI,
      dbUsers: usersDbAPI,
    },
  };

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk.withExtraArgument(thunkExtraArgument)),
  );

  return store;
}
