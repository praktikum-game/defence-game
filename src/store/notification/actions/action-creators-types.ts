import { Notification } from '../types';
import { NOTIFICATION_SHOW, NOTIFICATION_HIDE } from './action';

export interface NotificationShow {
  type: typeof NOTIFICATION_SHOW;
  payload: Notification;
}

export interface NotificationHide {
  type: typeof NOTIFICATION_HIDE;
  payload: Pick<Notification, 'id'>;
}

export type NotificationActions = NotificationShow | NotificationHide;
