import block from 'bem-cn';
import { NotificationCard } from 'components/NotificationCard/NotificationCard';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store';

import './notification-panel.css';

const b = block('notification-panel');

export const NotificationsPanel = () => {
  const notifications = useSelector((state: AppState) => state.notifications.notifications);

  return (
    <div className={b()}>
      {notifications.map((el) => (
        <NotificationCard key={el.id} data={el} />
      ))}
    </div>
  );
};
