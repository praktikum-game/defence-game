import { BaseAPI } from 'api/BaseAPI';
import { LeaderboardListResponse, LeaderboardUser } from './types';

class LeaderboardAPI extends BaseAPI {
  constructor() {
    super('/leaderboard');
  }

  public upsertUserToLeaderboard(user: LeaderboardUser) {
    return this.http.post('', {
      data: { ...user },
      ratingFieldName: 'score',
      teamName: 'defence-game',
    });
  }

  public getAllLeaderboard(fromPage = 0, limit = 10) {
    return this.http.post<Array<LeaderboardListResponse>>('/all', {
      ratingFieldName: 'score',
      cursor: fromPage,
      limit: limit,
    });
  }

  public getTeamLeaderboard(fromPage = 0, limit = 10) {
    return this.http.post<Array<LeaderboardListResponse>>('/defence-game', {
      ratingFieldName: 'score',
      cursor: fromPage,
      limit: limit,
    });
  }
}

export const leaderboardAPI = new LeaderboardAPI();
