import { MouseEventHandler } from 'react';
import { MessageItem } from '../../../../../api/forum-messages';

export type MessageItemProps = {
  className?: string;
  messageData: MessageItem;
  replyClick?: MouseEventHandler<HTMLButtonElement>;
};
