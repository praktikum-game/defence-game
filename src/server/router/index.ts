import { Router } from 'express';
import { themeRoutes } from './theme';
import { threadRoutes } from './thread';
import { userRoutes } from './user';

const router: Router = Router();

userRoutes(router);
themeRoutes(router);
threadRoutes(router);

export { router };
