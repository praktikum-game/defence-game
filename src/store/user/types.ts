import { ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState, ThunkExtraArgument } from '../types';
import { UserActions } from './actions/action-creators-types';

export type UserState = {
  data: string;
  loading: boolean;
};

export type UserThunkDispatch = ThunkDispatch<AppState, ThunkExtraArgument, UserActions>;

export type UserActionCreator = ActionCreator<
  ThunkAction<Promise<void>, AppState, ThunkExtraArgument, UserActions>
>;
