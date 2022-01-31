import { usersDbAPI } from 'api/db-users';
import { authAPI } from '../api/auth';
import { leaderboardAPI } from '../api/leaderboard';
import { usersAPI } from '../api/users';
import { LeaderboardState } from './leaderboard';
import { NotificationState } from './notification/types';
import { ThemeState } from './theme/types';
import { UserState } from './user';

export type ThunkExtraArgument = {
  api: {
    leaderboard: typeof leaderboardAPI;
    auth: typeof authAPI;
    users: typeof usersAPI;
    dbUsers: typeof usersDbAPI;
  };
};

export interface AppState {
  user: UserState;
  leaderboard: LeaderboardState;
  theme: ThemeState;
  notifications:NotificationState
}
