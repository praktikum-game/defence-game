import { Optional, Model } from 'sequelize';

export interface CommentAttributes {
  id: number;
  content: string;
  reply_comment: Model<CommentAttributes, CommentCreationAttributes> | null;
}

export interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}