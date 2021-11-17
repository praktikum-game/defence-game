import { ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from '../index';
import {
  USER_FAILED_FETCH_DATA,
  USER_START_FETCH_DATA,
  USER_SUCCESS_FETCH_DATA,
} from './actions/action-types';

export type Action<T, P> = {
  readonly type: T;
  readonly payload?: P;
};

export type UserStartFetch = Action<typeof USER_START_FETCH_DATA, null>;
export type UserSuccessFetch = Action<typeof USER_SUCCESS_FETCH_DATA, string>;
export type UserFaliedFetch = Action<typeof USER_FAILED_FETCH_DATA, null>;
export type UserActions = UserStartFetch | UserSuccessFetch | UserFaliedFetch;

export type ThunkExtraArgument = {
  api: any; // здесь надо поменять не тип вызываемого апи
};
export type UserThunkDispatch = ThunkDispatch<AppState, ThunkExtraArgument, UserActions>;
export type UserActionCreator = ActionCreator<
  ThunkAction<Promise<UserActions | void>, AppState, ThunkExtraArgument, UserActions>
>;

export type UserState = {
  data: string;
  loading: boolean;
};
