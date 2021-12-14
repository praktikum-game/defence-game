import { Reducer } from 'redux';

import { authAPI } from '../api/auth';
import { leaderboardAPI } from '../api/leaderboard';
import { usersAPI } from '../api/users';

export type ThunkExtraArgument = {
  api: {
    leaderboard: typeof leaderboardAPI;
    auth: typeof authAPI;
    users: typeof usersAPI;
  };
};

export type AppState = ReturnType<Reducer>;
