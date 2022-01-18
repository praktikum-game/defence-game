import express, { Router } from 'express';
import { onlyAuthUserMiddleware } from 'server/middlewares/only-auth-user-middleware';
import { UserAPI } from '../controllers/UserAPI';

const jsonParser = express.json();

export const userRoutes = (router: Router) => {
  router.get(`/user`, UserAPI.getAll);
  router.get(`/user/:praktikumId`, onlyAuthUserMiddleware, UserAPI.getByPraktikumId);
  router.post(`/user`, onlyAuthUserMiddleware, jsonParser, UserAPI.create);
  router.patch(`/user/:praktikumId`, onlyAuthUserMiddleware, jsonParser, UserAPI.update);
  router.delete(`/user/:praktikumId`, onlyAuthUserMiddleware, UserAPI.delete);
};
