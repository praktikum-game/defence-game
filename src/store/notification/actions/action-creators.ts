import { NOTIFICATION_HIDE, NOTIFICATION_SHOW } from './action';
import { NotificationHide, NotificationShow } from './action-creators-types';
import { Notification } from '../types';
import { nanoid } from 'nanoid';

export const showNotification = (notification: Notification): NotificationShow => ({
  type: NOTIFICATION_SHOW,
  payload: notification,
});

export const hideNotification = (id: string): NotificationHide => ({
  type: NOTIFICATION_HIDE,
  payload: {
    id,
  },
});

export const showNotificationWithTimeout =
  (notification: Omit<Notification, 'id'>, timeoutMs: number = 6000) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (dispatch: any) => {
    const localId = nanoid();

    dispatch(showNotification({ ...notification, id: localId }));

    setTimeout(() => dispatch(hideNotification(localId)), timeoutMs);
  };
