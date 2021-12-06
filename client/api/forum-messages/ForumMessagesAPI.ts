import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { leaderboardData, messagesData } from '../mocks/mocks';
import { MessageItem } from './types';

const mock = new MockAdapter(Axios, { onNoMatch: 'passthrough' });

mock.onGet('/mock/messages').reply(200, messagesData);
mock.onGet('/mock/leaderboard').reply(200, leaderboardData);
class ForumMessagesAPI {
  public fetchMessagesData() {
    return Axios.get<MessageItem[]>('/mock/messages');
  }
}

export const messagesAPI = new ForumMessagesAPI();
