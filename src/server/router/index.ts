import { Router } from 'express';
import { crudRoutes } from './user';

const router: Router = Router();

crudRoutes(router);

export { router };
