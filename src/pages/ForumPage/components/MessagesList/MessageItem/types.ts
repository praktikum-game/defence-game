import { MouseEventHandler } from 'react';

export type MessageItemProps = {
  className?: string;
  messageData: { date: string; content: string; userName: string; userAvatar: string | null };
  replyClick?: MouseEventHandler<HTMLButtonElement>;
  isReply?: boolean;
};
