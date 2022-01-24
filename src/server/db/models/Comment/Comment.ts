import { DataTypes, Model, Sequelize, Association } from 'sequelize';
import { ForumThread } from '../ForumThread';
import { User } from '../User';

import { CommentAttributes, CommentCreationAttributes } from './types';

export class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  declare id: number;

  declare content: string;

  declare replyCommentId: number | null;

  declare userId: number;

  declare forumThreadId: number;

  declare static associations: {
    user: Association<Comment, User>;
    forumThread: Association<Comment, ForumThread>;
  };
}

export function initCommentModel(sequelize: Sequelize) {
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      replyCommentId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      forumThreadId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: true,
      tableName: 'comments',
    },
  );
}
