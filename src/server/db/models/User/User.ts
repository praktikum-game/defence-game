import { ModelDefined, DataTypes } from 'sequelize';
import { sequelize } from '../../sequelize';

import { UserCreationAttributes } from './types';
import { SiteTheme } from '../SiteTheme';
import { UserAttributes } from 'shared/types/UserAttributes';

const User: ModelDefined<UserAttributes, UserCreationAttributes> = sequelize.define(
  'User',
  {
    // id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(255), allowNull: false },
    avatar: { type: DataTypes.TEXT, allowNull: true },
  },
  { underscored: true },
);
SiteTheme.hasMany(User);
User.belongsTo(SiteTheme, { foreignKey: { allowNull: true } });
// worked User.belongsTo(SiteTheme, { as: 'site_theme', foreignKey: { allowNull: true } });

export { User };
