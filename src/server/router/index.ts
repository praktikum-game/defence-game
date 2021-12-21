import { Router } from 'express';
import { userRoutes } from './user';

const router: Router = Router();

userRoutes(router);

export { router };
