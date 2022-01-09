import { Router } from 'express';
import { themeRoutes } from './theme';
import { threadRoutes } from './thread';
import { userRoutes } from './user';
import { commentRoutes } from './comments';

const router: Router = Router();

userRoutes(router);
themeRoutes(router);
threadRoutes(router);
commentRoutes(router);

export { router };
