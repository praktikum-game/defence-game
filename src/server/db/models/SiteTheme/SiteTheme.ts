import { SiteThemeAttributes, SiteThemeCreationAttributes } from './types';

import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Model,
  Sequelize,
} from 'sequelize';
import { User } from '../User';

export class SiteTheme
  extends Model<SiteThemeAttributes, SiteThemeCreationAttributes>
  implements SiteThemeAttributes
{
  declare id: number;

  declare theme: string;

  declare readonly createdAt: Date;

  declare readonly updatedAt: Date;

  declare getUsers: HasManyGetAssociationsMixin<User>;

  declare addUser: HasManyAddAssociationMixin<User, number>;

  declare hasUser: HasManyHasAssociationMixin<User, number>;

  declare countUsers1: HasManyCountAssociationsMixin;

  declare createUser: HasManyCreateAssociationMixin<User>;

  declare readonly users1?: User[];

  declare static associations: {
    users: Association<SiteTheme, User>;
  };
}

export function initSiteThemeModel(sequelize: Sequelize) {
  SiteTheme.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      theme: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      tableName: 'site_themes',
      sequelize,
      underscored: true,
    },
  );
}
