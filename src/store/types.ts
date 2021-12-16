import { authAPI } from '../api/auth';
import { leaderboardAPI } from '../api/leaderboard';
import { usersAPI } from '../api/users';
import { LeaderboardState } from './leaderboard';
import { UserState } from './user';

export type ThunkExtraArgument = {
  api: {
    leaderboard: typeof leaderboardAPI;
    auth: typeof authAPI;
    users: typeof usersAPI;
  };
};

export interface AppState {
  user: UserState;
  leaderboard: LeaderboardState;
}
