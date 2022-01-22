import { Optional } from 'sequelize';

export interface CommentAttributes {
  id: number;
  content: string;
  replyCommentId: number | null;
  userId: number;
  forumThreadId: number;
  updatedAt: string;
  createdAt: string;
}

export interface CommentCreationAttributes
  extends Optional<CommentAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
