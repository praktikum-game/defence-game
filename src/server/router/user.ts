import express, { Router } from 'express';
import { UserAPI } from '../controllers/UserAPI';
import { apiEndpoint } from './consts';

const jsonParser = express.json();

export const userRoutes = (router: Router) => {
  router.get(`${apiEndpoint}/user`, UserAPI.getAll);
  router.get(`${apiEndpoint}/user/:id`, UserAPI.getById);
  router.get(`${apiEndpoint}/user/:praktikumId`, UserAPI.getByPraktikumId);
  router.post(`${apiEndpoint}/user`, jsonParser, UserAPI.create);
  router.patch(`${apiEndpoint}/user/:praktikumId`, jsonParser, UserAPI.update);
  router.delete(`${apiEndpoint}/user/:praktikumId`, UserAPI.delete);
};
