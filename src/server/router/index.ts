import { Router } from 'express';
import { themeRoutes } from './theme';
import { userRoutes } from './user';

const router: Router = Router();

userRoutes(router);
themeRoutes(router);

export { router };
