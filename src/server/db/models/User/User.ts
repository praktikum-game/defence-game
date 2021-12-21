import { ModelDefined, DataTypes } from 'sequelize';
import { sequelize } from '../../sequelize';

import { UserAttributes, UserCreationAttributes } from './types';
import { Comment } from '../Comment';
import { SiteTheme } from '../SiteTheme';
import { ForumThread } from '../ForumThread';

const User: ModelDefined<UserAttributes, UserCreationAttributes> = sequelize.define(
  'User',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    praktikumId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { underscored: true },
);

User.hasMany(Comment, { as: 'comments' });
User.hasMany(ForumThread, { as: 'forum_threads' });
User.belongsTo(SiteTheme, { as: 'current_theme' });

export { User };
