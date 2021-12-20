import { Optional, ModelDefined } from 'sequelize';

export interface CommentAttributes {
  id: number;
  content: string;
  reply_comment: ModelDefined<CommentAttributes, CommentCreationAttributes> | null;
}

export interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}
