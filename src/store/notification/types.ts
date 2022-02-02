export type NotificationType = 'success' | 'warning' | 'error';

export type Notification = {
  id: string;
  title?: string;
  text?: string;
  type: NotificationType;
};

export type NotificationState = {
  notifications: Array<Notification>;
};
