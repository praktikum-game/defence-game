import { ModelDefined, DataTypes } from 'sequelize';
import { sequelize } from '../../sequelize';
import { User } from '../User';

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

User.hasMany(ForumThread, { foreignKey: { allowNull: false } });
ForumThread.belongsTo(User, { foreignKey: { allowNull: false } });

export { ForumThread };
