import { Optional } from 'sequelize';

export interface CommentAttributes {
  id: number;
  content: string;
  replyCommentId: number | null;
  userId: number;
  forumThreadId: number;
}

export interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}
