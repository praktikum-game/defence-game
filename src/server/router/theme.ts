import express, { Router } from 'express';
import { SiteThemeAPI } from 'server/controllers/SiteThemeAPI';
import { apiEndpoint } from './consts';

const jsonParser = express.json();
export const themeRoutes = (router: Router) => {
  router.get(`${apiEndpoint}/theme`, SiteThemeAPI.getAll);
  router.get(`${apiEndpoint}/theme/:id`, SiteThemeAPI.getById);
  router.get(`${apiEndpoint}/theme/:theme`, SiteThemeAPI.getByThemeName);
  router.post(`${apiEndpoint}/theme`, jsonParser, SiteThemeAPI.create);
  router.patch(`${apiEndpoint}/theme/:theme`, jsonParser, SiteThemeAPI.update);
  router.delete(`${apiEndpoint}/theme/:theme`, SiteThemeAPI.delete);
};
