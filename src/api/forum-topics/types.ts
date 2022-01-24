import { UserDbModel } from 'api/db-users/types';

export type ForumThreadModel = {
  id: number;
  content: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: UserDbModel;
  messagesCount: number;
};

export type ForumThreadCreationModel = Pick<ForumThreadModel, 'content' | 'subject'>;
