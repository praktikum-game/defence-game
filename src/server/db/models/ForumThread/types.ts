import { Model, Optional } from 'sequelize';
import { CommentAttributes, CommentCreationAttributes } from '../Comment';
// import { CommentAttributes, CommentCreationAttributes } from '../Comment';
// import { UserAttributes, UserCreationAttributes } from '../User';

export interface ForumThreadAttributes {
  id: number;
  content: string;
  subject: string;

  userId: number;
  comments?: Model<CommentAttributes, CommentCreationAttributes> | null;
}

export interface ForumThreadCreationAttributes extends Optional<ForumThreadAttributes, 'id'> {}
