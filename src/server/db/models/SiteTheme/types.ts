import { Optional } from 'sequelize';

export interface SiteThemeAttributes {
  id: number;
  theme: string;
}

export interface SiteThemeCreationAttributes extends Optional<SiteThemeAttributes, 'id'> {}
