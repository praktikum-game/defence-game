import { SiteTheme, SiteThemeAttributes, SiteThemeCreationAttributes } from '../models/SiteTheme';
import { BaseService } from './BaseService';

class SiteThemeService extends BaseService<SiteThemeAttributes, SiteThemeCreationAttributes> {
  constructor() {
    super(SiteTheme);
  }

  findByThemeName(theme: string) {
    return this.readOne({ where: { theme } });
  }
}

export const siteThemeService = new SiteThemeService();
