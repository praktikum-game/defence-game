export type LeaderboardItem = {
  id: string;
  username: string;
  login: string;
  score: number;
};

export type LeaderboardTableColumn = {
  title: string;
  dataId: keyof LeaderboardItem;
};

export type LeaderboardTableProps = {
  columns: Array<LeaderboardTableColumn>;
  data: Array<LeaderboardItem>;
  className?: string;
};
