import { leaderboarApi } from '../api/leaderboard/LeadboardAPI';
// eslint-disable-next-line import/no-cycle
import { RootReducer } from './store';

export type ThunkExtraArgument = {
  api: {
    lb: typeof leaderboarApi;
  };
};

export type AppState = ReturnType<RootReducer>;
