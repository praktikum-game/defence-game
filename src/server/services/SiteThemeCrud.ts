import { BaseCrud } from './BaseCrud';
import {
  SiteTheme,
  SiteThemeAttributes,
  SiteThemeCreationAttributes,
} from '../db/models/SiteTheme';

class SiteThemeCrud extends BaseCrud<SiteThemeAttributes, SiteThemeCreationAttributes> {
  constructor() {
    super(SiteTheme);
  }
}

export const siteThemeCrud = new SiteThemeCrud();
