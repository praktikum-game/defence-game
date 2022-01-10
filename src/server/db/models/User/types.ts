export interface UserAttributes {
  id: number;
  name: string;
  avatar?: string | null;

  siteThemeId?: number | null;
}

export interface UserCreationAttributes extends UserAttributes {}
