import { LeaderboardUser } from "api/leaderboard/types";

export type LeaderboardTableColumn = {
  title: string;
  dataId: keyof LeaderboardUser;
};

export type LeaderboardTableProps = {
  columns: Array<LeaderboardTableColumn>;
  data: Array<LeaderboardUser>;
  className?: string;
};
