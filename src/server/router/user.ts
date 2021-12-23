import express, { Router } from 'express';
import { UserAPI } from '../controllers/UserAPI';

const jsonParser = express.json();

export const userRoutes = (router: Router) => {
  router.get(`/user`, UserAPI.getAll);
  router.get(`/user/:id`, UserAPI.getById);
  router.get(`/user/:praktikumId`, UserAPI.getByPraktikumId);
  router.post(`/user`, jsonParser, UserAPI.create);
  router.patch(`/user/:praktikumId`, jsonParser, UserAPI.update);
  router.delete(`/user/:praktikumId`, UserAPI.delete);
};
