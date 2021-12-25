import express, { Router } from 'express';
import { SiteThemeAPI } from 'server/controllers/SiteThemeAPI';

const jsonParser = express.json();

export const themeRoutes = (router: Router) => {
  router.get(`/theme`, SiteThemeAPI.getAll);
  router.get(`/theme/:theme`, SiteThemeAPI.getByThemeName);
  router.post(`/theme`, jsonParser, SiteThemeAPI.create);
  router.patch(`/theme/:theme`, jsonParser, SiteThemeAPI.update);
  router.delete(`/theme/:theme`, SiteThemeAPI.delete);
};
