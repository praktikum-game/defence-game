import express, { Router } from 'express';
import { SiteThemeAPI } from 'server/controllers/SiteThemeAPI';
import { onlyAuthUserMiddleware } from 'server/middlewares/only-auth-user-middleware';

const jsonParser = express.json();

export const themeRoutes = (router: Router) => {
  router.get(`/theme`, SiteThemeAPI.getAll);
  router.get(`/theme/:theme`, SiteThemeAPI.getByThemeName);
  router.post(`/theme`, onlyAuthUserMiddleware, jsonParser, SiteThemeAPI.create);
  router.patch(`/theme/:theme`, onlyAuthUserMiddleware, jsonParser, SiteThemeAPI.update);
  router.delete(`/theme/:theme`, onlyAuthUserMiddleware, SiteThemeAPI.delete);
};
