import express, { Router } from 'express';
import { authMiddleware } from 'server/middlewares/auth-middleware';
import { checkUserInDbMiddleware } from 'server/middlewares/check-user-in-db-middleware';
import { UserAPI } from '../controllers/UserAPI';

const jsonParser = express.json();
const authenticate = authMiddleware();
const autoAddUser = checkUserInDbMiddleware();

export const userRoutes = (router: Router) => {
  router.get(`/user`, UserAPI.getAll);
  router.get(`/user/:praktikumId`, UserAPI.getByPraktikumId);
  router.post(`/user`, jsonParser, UserAPI.create);
  router.patch(`/user/:praktikumId`, [jsonParser, authenticate, autoAddUser], UserAPI.update);
  router.delete(`/user/:praktikumId`, UserAPI.delete);
};
