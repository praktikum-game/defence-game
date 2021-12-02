import React from 'react';
import { MessagesListProps } from './types';
import { MessageItem } from './MessageItem';

// import './thread-list.css';

export const MessagesList = ({ children }: MessagesListProps): JSX.Element => (
  <div className="messages-list-container">{children}</div>
);

MessagesList.Message = MessageItem;
