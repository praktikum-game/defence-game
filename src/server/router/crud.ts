import express, { Router } from 'express';
import { CrudAPI } from 'server/controllers/CrudAPI';

const jsonParser = express.json();

export const crudRoutes = (router: Router) => {
  router.get('/crud', CrudAPI.getAll);
  router.get('/crud/:id', CrudAPI.getById);
  router.post('/crud', jsonParser, CrudAPI.create);
  router.patch('/crud/:id', jsonParser, CrudAPI.update);
  router.delete('/crud/:id', CrudAPI.delete);
};
