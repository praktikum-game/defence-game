import { Optional } from 'sequelize';
import { Comment } from '../Comment';

export interface ForumThreadAttributes {
  id: number;
  content: string;
  subject: string;

  comments: typeof Comment[];
}

export interface ForumThreadCreationAttributes extends Optional<ForumThreadAttributes, 'id'> {}
