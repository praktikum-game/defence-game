import React, { memo } from 'react';
import { MessagesListProps } from './types';
import { MessageItem } from './MessageItem';
import block from 'bem-cn';

const b = block('messages-list-container');

export const MessagesList = ({ children, className }: MessagesListProps): JSX.Element => (
  <div className={b.mix(className)}>{children}</div>
);

MessagesList.Message = memo(MessageItem);
