import { ThemeActions } from './actions/action-creators-types';
import { ThemeState } from './types';

const initialState: ThemeState = {
  theme: 'light',
};

export function reducer(state = initialState, action?: ThemeActions) {
  switch (action?.type) {
    case 'CHANGE_THEME':
      return { ...state, theme: action.payload };
      break;

    default:
      return state;
  }
}
