import express, { Router } from 'express';
import { onlyAuthUserMiddleware } from 'server/middlewares/only-auth-user-middleware';
import { UserAPI } from '../controllers/UserAPI';

const jsonParser = express.json();
const onlyAuth = onlyAuthUserMiddleware();

export const userRoutes = (router: Router) => {
  router.get(`/user`, UserAPI.getAll);
  router.get(`/user/:praktikumId`, onlyAuth, UserAPI.getByPraktikumId);
  router.post(`/user`, onlyAuth, jsonParser, UserAPI.create);
  router.patch(`/user/:praktikumId`, onlyAuth, jsonParser, UserAPI.update);
  router.delete(`/user/:praktikumId`, onlyAuth, UserAPI.delete);
};
