import { ModelDefined, DataTypes } from 'sequelize';
import { sequelize } from '../../sequelize';

import { SiteThemeAttributes, SiteThemeCreationAttributes } from './types';

export const SiteTheme: ModelDefined<SiteThemeAttributes, SiteThemeCreationAttributes> =
  sequelize.define('SiteTheme', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    theme: { type: DataTypes.STRING, allowNull: false },
  });
