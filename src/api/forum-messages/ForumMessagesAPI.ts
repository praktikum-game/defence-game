import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { messagesData } from '../mocks/mocks';
import { MessageItem } from './types';

const mock = new MockAdapter(Axios);

mock.onGet('/mock/messages').reply(200, messagesData);

class ForumMessagesAPI {
  public fetchMessagesData() {
    return Axios.get<MessageItem[]>('/mock/messages');
  }
}

export const messagesAPI = new ForumMessagesAPI();
