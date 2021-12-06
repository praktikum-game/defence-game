import { authAPI } from '../api/auth';
import { leaderboardAPI } from '../api/leaderboard';
import { usersAPI } from '../api/users';
// eslint-disable-next-line import/no-cycle
import { RootReducer } from './store';

export type ThunkExtraArgument = {
  api: {
    leaderboard: typeof leaderboardAPI;
    auth: typeof authAPI;
    users: typeof usersAPI;
  };
};

export type AppState = ReturnType<RootReducer>;
