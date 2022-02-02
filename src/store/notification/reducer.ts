import { NotificationActions } from './actions/action-creators-types';
import { NotificationState } from './types';

const initialState: NotificationState = {
  notifications: [],
};

export function reducer(state = initialState, action?: NotificationActions) {
  switch (action?.type) {
    case 'NOTIFICATION_SHOW':
      const { payload } = action;
      return {
        ...state,
        notifications: [...state.notifications, { ...payload }],
      };

    case 'NOTIFICATION_HIDE':
      const id = action.payload.id;
      return { ...state, notifications: state.notifications.filter((el) => el.id !== id) };
    default:
      return state;
  }
}
