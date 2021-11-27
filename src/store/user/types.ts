import { ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store';
import { ThunkExtraArgument } from '../types';
import { UserActions } from './actions/action-creators-types';

export type UserThunkDispatch = ThunkDispatch<AppState, ThunkExtraArgument, UserActions>;
export type UserActionCreator = ActionCreator<
  ThunkAction<Promise<UserActions | void>, AppState, ThunkExtraArgument, UserActions>
>;

export type UserState = {
  data: string;
  loading: boolean;
};
