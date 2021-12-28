import { Optional, Model } from 'sequelize';
import { CommentAttributes, CommentCreationAttributes } from '../Comment';

export interface ForumThreadAttributes {
  id: number;
  content: string;
  subject: string;
  userId: number;
  userName: string;

  comments?: Model<CommentAttributes, CommentCreationAttributes>[];
}

export interface ForumThreadCreationAttributes extends Optional<ForumThreadAttributes, 'id'> {}
