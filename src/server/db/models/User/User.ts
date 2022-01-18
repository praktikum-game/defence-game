import { ModelDefined, DataTypes } from 'sequelize';
import { sequelize } from '../../sequelize';

import { UserCreationAttributes } from './types';
import { SiteTheme } from '../SiteTheme';
import { UserAttributes } from 'shared/types/UserAttributes';

const User: ModelDefined<UserAttributes, UserCreationAttributes> = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(255), allowNull: false },
    avatar: { type: DataTypes.TEXT, allowNull: true },
    SiteThemeId: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  },
  { underscored: true },
);
SiteTheme.hasMany(User);
User.belongsTo(SiteTheme, { foreignKey: { allowNull: false } });

export { User };
