import { UserDbModel } from 'api/db-users/types';

export type ForumThreadModel = {
  id: number;
  content: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  User: UserDbModel;
  messagesCount: number;
};

export type ForumThreadCreationModel = Pick<ForumThreadModel, 'content' | 'subject'>;
