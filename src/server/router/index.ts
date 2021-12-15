import { Router } from 'express';
import { crudRoutes } from './crud';

const router: Router = Router();

crudRoutes(router);

export { router };
