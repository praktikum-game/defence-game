import { ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { LeaderboardItem } from '../../api/leaderboard/types';
import { AppState, ThunkExtraArgument } from '../types';
import { LeaderboardActions } from './actions/action-creators-types';

export type LeaderboardState = {
  usersList: LeaderboardItem[];
  loading: boolean;
};
export type LeaderboardThunkDispatch = ThunkDispatch<
  AppState,
  ThunkExtraArgument,
  LeaderboardActions
>;

export type LeadboardActionCreator = ActionCreator<
  ThunkAction<Promise<LeaderboardActions | void>, AppState, ThunkExtraArgument, LeaderboardActions>
>;
