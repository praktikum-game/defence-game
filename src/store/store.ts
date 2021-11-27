import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import { userReducer } from './user';
import { leaderboardReducer } from './leaderboard';
import { leaderboarApi } from '../api/leaderboard/LeadboardAPI';
// eslint-disable-next-line import/no-cycle
import { ThunkExtraArgument } from './types';

export const rootReducer = combineReducers({ user: userReducer, leaderboard: leaderboardReducer });

const thunkExtraArgument: ThunkExtraArgument = {
  api: {
    lb: leaderboarApi,
  },
};

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument(thunkExtraArgument)),
);
