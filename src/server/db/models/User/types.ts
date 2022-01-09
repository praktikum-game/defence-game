import { Optional } from 'sequelize';

export interface UserAttributes {
  id: number;
  praktikumId: number;

  siteThemeId: number;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
