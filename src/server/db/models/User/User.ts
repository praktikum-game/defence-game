import { ModelDefined, DataTypes } from 'sequelize';
import { sequelize } from '../../sequelize';

import { UserAttributes, UserCreationAttributes } from './types';
import { SiteTheme } from '../SiteTheme';

const User: ModelDefined<UserAttributes, UserCreationAttributes> = sequelize.define(
  'User',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    praktikumId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { underscored: true },
);

User.belongsTo(SiteTheme, { as: 'site_theme', foreignKey: { allowNull: false } });

export { User };
