import Axios from 'axios';
// import { leaderboardData } from '../mocks/mocks';
import { LeaderboardItem } from './types';
// const MockAdapter = require('axios-mock-adapter');

// const mock = new MockAdapter(Axios);

// mock.onGet('/mock/leaderboard').reply(200, leaderboardData);

class LeaderboardAPI {
  public fetchLeaderboardData() {
    return Axios.get<LeaderboardItem[]>('/mock/leaderboard');
  }
}

export const leaderboardAPI = new LeaderboardAPI();
