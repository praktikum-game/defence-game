import { BaseAPI } from 'api/BaseAPI';
import { localBaseUrl } from 'api/consts';
import { MessageModel } from './types';

class ForumMessagesAPI extends BaseAPI {
  constructor() {
    super('/comments', localBaseUrl);
  }

  public fetchMessagesData(forumId: number, offset: number, limit: number = 10) {
    return this.http.get<MessageModel[]>('', { params: { offset, limit, forumId } });
  }

  public postNewMessage(
    content: string,
    forumThreadId: number,
    replyCommentId: number | null = null,
  ) {
    return this.http.post('', { content, forumThreadId, replyCommentId });
  }
}

export const messagesAPI = new ForumMessagesAPI();
