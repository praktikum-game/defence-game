import express, { Router } from 'express';
import { UserAPI } from '../controllers/UserAPI';

const jsonParser = express.json();

export const userRoutes = (router: Router) => {
  router.get('/user', UserAPI.getAll);
  router.get('/user/:id', UserAPI.getById);
  router.post('/user', jsonParser, UserAPI.create);
  router.patch('/user/:id', jsonParser, UserAPI.update);
  router.delete('/user/:id', UserAPI.delete);
};
