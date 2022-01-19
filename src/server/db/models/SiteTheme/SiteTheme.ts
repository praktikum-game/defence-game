import { ModelDefined, DataTypes } from 'sequelize';
import { sequelize } from '../../sequelize';

import { SiteThemeAttributes, SiteThemeCreationAttributes } from './types';

// export const SiteTheme: ModelDefined<SiteThemeAttributes, SiteThemeCreationAttributes> =
//   sequelize.define(
//     'SiteTheme',
//     {
//       id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//       theme: { type: DataTypes.STRING, allowNull: false, unique: true },
//     },
//     { underscored: true, indexes: [{ fields: ['theme'] }] },
//   );


  import {
    Association,
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyHasAssociationMixin,
    Model,
    Optional,
    Sequelize,
  } from 'sequelize';
  // import { User1 } from '../User1/User1';
  

  
  export class SiteTheme
    extends Model<SiteThemeAttributes, SiteThemeCreationAttributes>
    implements SiteThemeAttributes
  {
    declare id: number;
  
    declare theme: string;
  
    declare readonly createdAt: Date;
  
    declare readonly updatedAt: Date;
  
    declare getUsers1: HasManyGetAssociationsMixin<User1>; // Note the null assertions!
  
    declare addUser: HasManyAddAssociationMixin<User1, number>;
  
    declare hasUser: HasManyHasAssociationMixin<User1, number>;
  
    declare countUsers1: HasManyCountAssociationsMixin;
  
    declare createUsers1: HasManyCreateAssociationMixin<User1>;
  
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
          unique:true,
          allowNull: false,
        },
      },
      {
        tableName: 'site_theme',
        sequelize,
        underscored: true,
      },
    );
  }
  