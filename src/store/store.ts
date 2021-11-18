import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as userReducer } from './user/reducer';
import { ThunkExtraArgument } from './user/types';

export const rootReducer = combineReducers({ user: userReducer });

const thunkExtraArgument: ThunkExtraArgument = {
  api: {},
};

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument(thunkExtraArgument))
);
