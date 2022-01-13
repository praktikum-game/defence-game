import { ModelDefined, DataTypes } from 'sequelize';
import { sequelize } from '../../sequelize';
import { ForumThread } from '../ForumThread';
import { User } from '../User';

import { CommentAttributes, CommentCreationAttributes } from './types';

const Comment: ModelDefined<CommentAttributes, CommentCreationAttributes> = sequelize.define(
  'Comment',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    content: { type: DataTypes.TEXT, allowNull: false },
  },
  { underscored: true },
);

Comment.belongsTo(Comment, { as: 'reply_comment' });
ForumThread.hasMany(Comment, { as: 'comments', foreignKey: { allowNull: false } });

Comment.belongsTo(ForumThread, { as: 'forum_thread', foreignKey: { allowNull: false } });
Comment.belongsTo(User, { as: 'user', foreignKey: { allowNull: false } });
export { Comment };
