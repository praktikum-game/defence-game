import express, { Router } from 'express';
import { SiteThemeAPI } from 'server/controllers/SiteThemeAPI';
import { onlyAuthUserMiddleware } from 'server/middlewares/only-auth-user-middleware';

const jsonParser = express.json();
const onlyAuth = onlyAuthUserMiddleware();

export const themeRoutes = (router: Router) => {
  router.get(`/theme`, SiteThemeAPI.getAll);
  router.get(`/theme/:theme`, SiteThemeAPI.getByThemeName);
  router.post(`/theme`, onlyAuth, jsonParser, SiteThemeAPI.create);
  router.patch(`/theme/:theme`, onlyAuth, jsonParser, SiteThemeAPI.update);
  router.delete(`/theme/:theme`, onlyAuth, SiteThemeAPI.delete);
};
