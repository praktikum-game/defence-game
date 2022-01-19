import { ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState, ThunkExtraArgument } from 'store';
import { ThemeActions } from './actions/action-creators-types';

export type Theme = 'dark' | 'light';

export type ThemeState = {
  theme: Theme;
};

export type ThemeThunkDispatch = ThunkDispatch<AppState, ThunkExtraArgument, ThemeActions>;

export type ThemeActionCreator = ActionCreator<
  ThunkAction<Promise<void>, AppState, ThunkExtraArgument, ThemeActions>
>;
