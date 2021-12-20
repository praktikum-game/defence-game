import { ModelDefined, DataTypes } from 'sequelize';
import { sequelize } from '../../sequelize';

import { UserAttributes, UserCreationAttributes } from './types';
import { Comment } from '../Comment';
import { SiteTheme } from '../SiteTheme';
import { ForumThread } from '../ForumThread';

const User: ModelDefined<UserAttributes, UserCreationAttributes> = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  backendId: { type: DataTypes.INTEGER, allowNull: false },
  first_name: { type: DataTypes.STRING, allowNull: false },
  second_name: { type: DataTypes.STRING, allowNull: false },
  display_name: { type: DataTypes.STRING, defaultValue: '' },
  login: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  avatar: { type: DataTypes.STRING, allowNull: false },
  score: { type: DataTypes.INTEGER, defaultValue: 0 },
});

User.hasMany(Comment, { as: 'comments' });
User.hasMany(ForumThread, { as: 'forum_threads' });
User.belongsTo(SiteTheme, { as: 'current_theme' });

export { User };
