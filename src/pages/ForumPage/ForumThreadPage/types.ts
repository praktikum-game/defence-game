import { MessageModel } from 'api/forum-messages/types';

export type MessageItem = Omit<MessageModel, 'createdAt' | 'forum_thread'> & { createdAt: Date };

export type ForumItem = {
  subject: string;
  content: string;
  createdAt: Date;
  userName: string;
  userId: number;
  id: number;
};
