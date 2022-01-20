import { MessageModel } from 'api/forum-messages/types';
import { ForumThreadModel } from 'api/forum-topics';

export type MessageItem = Omit<MessageModel, 'forum_thread'>;

export type ForumItem = ForumThreadModel;
