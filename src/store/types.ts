import { leaderboarApi } from '../api/leaderboard/LeadboardAPI';

export type ThunkExtraArgument = {
  api: {
    lb: typeof leaderboarApi;
  };
};

export type AppState = ReturnType<RootReducer>;
