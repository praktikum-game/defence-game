import express, { Router } from 'express';
import { LeaderboarAPI } from 'server/controllers/LeaderboardAPI';
import { checkRequestCookiesMiddleware } from 'server/middlewares/check-request-cookies-middleware';

const jsonParser = express.json();
const cookieChecker = checkRequestCookiesMiddleware();

export const leaderboardRoutes = (router: Router) => {
  router.post(
    `/leaderboard/defence-game`,
    jsonParser,
    cookieChecker,
    LeaderboarAPI.getTeamLeaderboard,
  );
  router.post('/leaderboard/all', jsonParser, cookieChecker, LeaderboarAPI.getLeaaderboard);
  //   router.post(`/leaderboard/:team`, jsonParser, LeaderboarAPI.updateUserInfoInLeaderboard);
};
