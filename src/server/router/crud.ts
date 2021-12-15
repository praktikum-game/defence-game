import { Router } from 'express';
import { CrudAPI } from 'server/controllers/CrudAPI';

export const crudRoutes = (router: Router) => {
  router.get('/crud', CrudAPI.readAll);
  router.post('/crud', CrudAPI.create);
  router.patch('/crud/:id', CrudAPI.update);
  router.delete('/crud/:id', CrudAPI.delete);
};
