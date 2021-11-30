import { authAPI } from '../api/auth';
import { leaderboarAPI } from '../api/leaderboard';
import { usersAPI } from '../api/users';
// eslint-disable-next-line import/no-cycle
import { RootReducer } from './store';

export type ThunkExtraArgument = {
  api: {
    leaderboard: typeof leaderboarAPI;
    auth: typeof authAPI;
    users: typeof usersAPI;
  };
};

export type AppState = ReturnType<RootReducer>;
