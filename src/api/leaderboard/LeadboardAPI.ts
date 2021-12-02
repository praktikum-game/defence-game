import Axios from 'axios';
import { LeaderboardItem } from './types';

class LeaderboardAPI {
  public fetchLeaderboardData() {
    return Axios.get<LeaderboardItem[]>('/mock/leaderboard');
  }
}

export const leaderboarAPI = new LeaderboardAPI();
