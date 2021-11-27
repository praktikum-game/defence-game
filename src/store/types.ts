import { leaderboarApi } from '../api/leaderboard/LeadboardAPI';

export type ThunkExtraArgument = {
  api: {
    lb: typeof leaderboarApi;
  };
};

// export type AsyncActionCreator<T> = ActionCreator<
//   ThunkAction<Promise<T | void>, AppState, ThunkExtraArgument, Action<T>>
// >;
