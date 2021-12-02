import React, { memo } from 'react';
import block from 'bem-cn';

import { MessagesListProps } from './types';
import { MessageItem } from './MessageItem';

const b = block('messages-list-container');

export const MessagesList = ({ children, className }: MessagesListProps): JSX.Element => (
  <div className={b.mix(className)}>{children}</div>
);

MessagesList.Message = memo(MessageItem);
