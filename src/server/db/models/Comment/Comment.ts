import { ModelDefined, DataTypes } from 'sequelize';
import { sequelize } from '../../sequelize';

import { CommentAttributes, CommentCreationAttributes } from './types';

const Comment: ModelDefined<CommentAttributes, CommentCreationAttributes> = sequelize.define(
  'Comment',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    content: { type: DataTypes.TEXT, allowNull: false },
  },
  { underscored: true },
);

Comment.belongsTo(Comment, { as: 'reply_comment', foreignKey: { allowNull: true } });

export { Comment };
