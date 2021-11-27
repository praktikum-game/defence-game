import { Action, ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from '..';
import { LeaderboardItem } from '../../api/leaderboard/type';
import { ThunkExtraArgument } from '../types';
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
  ThunkAction<
    Promise<LeadboardActionCreator | void>,
    AppState,
    ThunkExtraArgument,
    Action<LeadboardActionCreator>
  >
>;
