export type LeaderboardUser = {
  id: number;
  username: string;
  login: string;
  score: number;
};

export type LeaderboardRequest = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export type LeaderboardListResponse = {
  data: LeaderboardUser;
};
