import Axios from 'axios';
import { LeaderboardItem } from './types';

const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(Axios);
mock.onGet('/data/leaderboard').reply(200, [
  { id: 'a123', login: 'vasya', username: 'Василий Алибабаевич', score: 168 },
  { id: 'a124', login: 'kosoy', username: 'Косой', score: 202 },
  { id: 'a125', login: 'hmyr', username: 'Хмырь', score: 386 },
  { id: 'a126', login: 'docent', username: 'Доцент', score: 409 },
]);

class LeaderboardAPI {
  public fetchLeaderboardData() {
    return Axios.get<LeaderboardItem[]>('/data/leaderboard');
  }
}

export const leaderboardAPI = new LeaderboardAPI();
