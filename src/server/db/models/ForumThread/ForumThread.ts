import { DataTypes, Model, Association, Sequelize } from 'sequelize';
import { User } from '../User';

import { ForumThreadAttributes, ForumThreadCreationAttributes } from './types';

export class ForumThread
  extends Model<ForumThreadAttributes, ForumThreadCreationAttributes>
  implements ForumThreadAttributes
{
  declare id: number;

  declare subject: string;

  declare content: string;

  declare userId: number;

  declare static associations: {
    user: Association<ForumThread, User>;
  };
}

export function initForumThreadModel(sequelize: Sequelize) {
  ForumThread.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: true,
      tableName: 'forum_threads',
    },
  );
}
