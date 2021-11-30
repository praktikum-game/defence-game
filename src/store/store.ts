import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import { userReducer } from './user';
import { leaderboardReducer } from './leaderboard';
// eslint-disable-next-line import/no-cycle
import { ThunkExtraArgument } from './types';
import { authAPI } from '../api/auth';
import { leaderboarAPI } from '../api/leaderboard';
import { usersAPI } from '../api/users';

export const rootReducer = combineReducers({ user: userReducer, leaderboard: leaderboardReducer });

export type RootReducer = typeof rootReducer;

const thunkExtraArgument: ThunkExtraArgument = {
  api: {
    auth: authAPI,
    leaderboard: leaderboarAPI,
    users: usersAPI,
  },
};

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument(thunkExtraArgument)),
);
