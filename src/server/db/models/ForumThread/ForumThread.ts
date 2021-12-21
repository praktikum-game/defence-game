import { ModelDefined, DataTypes } from 'sequelize';
import { sequelize } from '../../sequelize';
import { Comment } from '../Comment';

import { ForumThreadAttributes, ForumThreadCreationAttributes } from './types';

const ForumThread: ModelDefined<ForumThreadAttributes, ForumThreadCreationAttributes> =
  sequelize.define(
    'ForumThread',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      content: { type: DataTypes.TEXT, allowNull: false },
      subject: { type: DataTypes.STRING, allowNull: false },
    },
    { underscored: true },
  );

ForumThread.hasMany(Comment, { as: 'comments' });

export { ForumThread };
