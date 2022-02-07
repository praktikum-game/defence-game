import { BaseAPI } from 'api/BaseAPI';
import { localBaseUrl, praktikumBaseUrl } from 'api/consts';
import { AxiosRequestConfig } from 'axios';
import { LEADERBOARD_TEAM_NAME } from 'consts';
import { LeaderboardListResponse, LeaderboardUser } from './types';

class LeaderboardAPI extends BaseAPI {
  constructor(baseUrl: string) {
    super('/leaderboard', baseUrl);
  }

  public upsertUserToLeaderboard(
    user: LeaderboardUser,
    options: AxiosRequestConfig | undefined = undefined,
  ) {
    return this.http.post(
      '',
      {
        data: { ...user },
        ratingFieldName: 'score',
        teamName: LEADERBOARD_TEAM_NAME,
      },
      { ...options },
    );
  }

  public getAllLeaderboard(
    fromPage = 0,
    limit = 10,
    options: AxiosRequestConfig | undefined = undefined,
  ) {
    return this.http.post<Array<LeaderboardListResponse>>(
      '/all',
      {
        ratingFieldName: 'score',
        cursor: fromPage,
        limit: limit,
      },
      { ...options },
    );
  }

  public getTeamLeaderboard(
    fromPage = 0,
    limit = 10,
    options: AxiosRequestConfig | undefined = undefined,
  ) {
    return this.http.post<Array<LeaderboardListResponse>>(
      `/${LEADERBOARD_TEAM_NAME}`,
      {
        ratingFieldName: 'score',
        cursor: fromPage,
        limit: limit,
      },
      { ...options },
    );
  }
}

export const localLeaderboardAPI = new LeaderboardAPI(localBaseUrl);
export const praktikumLeaderboardAPI = new LeaderboardAPI(praktikumBaseUrl);
