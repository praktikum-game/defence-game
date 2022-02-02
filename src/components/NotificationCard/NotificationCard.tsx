import block from 'bem-cn';
import React from 'react';
import { NotificationCardProps } from './types';

import './notification.css';

const b = block('notification-card');

export const NotificationCard = (props: NotificationCardProps) => {
  const { text, title } = props.data;
  return (
    <div className={b.mix(props.className)}>
      <div className={b('title')}>{title}</div>
      <div className={b('message')}>{text}</div>
    </div>
  );
};
