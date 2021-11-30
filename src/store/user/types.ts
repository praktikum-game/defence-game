import { ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { UserData } from '../../api/auth';
import { AppState, ThunkExtraArgument } from '../types';
import { UserActions } from './actions/action-creators-types';

export type UserState = {
  data: UserData | null;
  loading: boolean;
};

export type UserThunkDispatch = ThunkDispatch<AppState, ThunkExtraArgument, UserActions>;

export type UserActionCreator = ActionCreator<
  ThunkAction<Promise<void>, AppState, ThunkExtraArgument, UserActions>
>;
