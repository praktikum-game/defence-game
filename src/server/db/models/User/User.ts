import { DataTypes, Sequelize, Model, Association, HasManyCreateAssociationMixin } from 'sequelize';

import { UserCreationAttributes } from './types';
import { SiteTheme } from '../SiteTheme';
import { UserAttributes } from 'shared/types/UserAttributes';
import { ForumThread } from '../ForumThread';
import { Comment } from '../Comment';

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: number;

  declare name: string;

  declare avatar: string | null | undefined;

  declare siteThemeId: number;

  declare createForumThread: HasManyCreateAssociationMixin<ForumThread>;

  declare static associations: {
    siteTheme: Association<User, SiteTheme>;
    forumThreads: Association<User, ForumThread>;
    comments: Association<User, Comment>;
  };
}

export function initUserModel(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      siteThemeId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
      underscored: true,
    },
  );
}
