import { ModelDefined, DataTypes, Sequelize, Model } from 'sequelize';
import { sequelize } from '../../sequelize';

import { UserCreationAttributes } from './types';
import { SiteTheme } from '../SiteTheme';
import { UserAttributes } from 'shared/types/UserAttributes';

// const User: ModelDefined<UserAttributes, UserCreationAttributes> = sequelize.define(
//   'User',
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: false,
//       unique: true,
//     },
//     name: { type: DataTypes.STRING(255), allowNull: false },
//     avatar: { type: DataTypes.TEXT, allowNull: true },
//     SiteThemeId: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
//   },
//   { underscored: true },
// );
// SiteTheme.hasMany(User);
// User.belongsTo(SiteTheme, { foreignKey: { allowNull: false } });

// export { User };


export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes{
  declare id: number,
  declare name:string;
  declare avatar:string;

  declare siteThemeId: number;

  declare associations:{
    
  }
}

export function initUserModel(sequelize:Sequelize){
  User.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:false,
      unique:true
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false,

    },
    avatar:{
      type:DataTypes.STRING,
      allowNull:true,
      
    },
    siteThemeId:{
      type:DataTypes.NUMBER,
      allowNull:false
    }
  },{
    sequelize, tableName:'users', underscored:true
  })
}