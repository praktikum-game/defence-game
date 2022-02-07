import { Router } from 'express';
import { themeRoutes } from './theme';
import { threadRoutes } from './thread';
import { userRoutes } from './user';
import { commentRoutes } from './comments';
import { leaderboardRoutes } from './leaderboard';
import { oauthRoutes } from './oauth';
import { authRoutes } from './auth';

const router: Router = Router();

userRoutes(router);
themeRoutes(router);
threadRoutes(router);
commentRoutes(router);
leaderboardRoutes(router);
oauthRoutes(router);
authRoutes(router);

export { router };
