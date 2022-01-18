import express, { Router } from 'express';
import { onlyAuthUserMiddleware } from 'server/middlewares/only-auth-user-middleware';
import { checkUserInDbMiddleware } from 'server/middlewares/check-user-in-db-middleware';
import { UserAPI } from '../controllers/UserAPI';

const jsonParser = express.json();
const autoAddUser = checkUserInDbMiddleware();

export const userRoutes = (router: Router) => {
  router.get(`/user`, UserAPI.getAll);
  router.get(`/user/:praktikumId`, onlyAuthUserMiddleware, UserAPI.getByPraktikumId);
  router.post(`/user`, onlyAuthUserMiddleware, jsonParser, UserAPI.create);
  router.patch(
    `/user/:praktikumId`,
    onlyAuthUserMiddleware,
    jsonParser,
    autoAddUser,
    UserAPI.update,
  );
  router.delete(`/user/:praktikumId`, onlyAuthUserMiddleware, UserAPI.delete);
};
