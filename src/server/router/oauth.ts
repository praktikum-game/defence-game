import express, { Router } from 'express';
import { OAuthAPI } from 'server/controllers/OAuthAPI';

const jsonParser = express.json();

export const oauthRoutes = (router: Router) => {
  router.get('/oauth/yandex', jsonParser, OAuthAPI.getServiceId);
  router.post('/oauth/yandex', jsonParser, OAuthAPI.appOAuth);
};
