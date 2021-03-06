import { BaseAPI } from 'api/BaseAPI';
import { localBaseUrl } from 'api/consts';
import { MessageModel, NewMessageModelResponse } from './types';

class ForumMessagesAPI extends BaseAPI {
  constructor() {
    super('/comments', localBaseUrl);
  }

  public fetchMessagesData(forumId: number) {
    return this.http.get<MessageModel[]>('', { params: { forumId } });
  }

  public postNewMessage(
    content: string,
    forumThreadId: number,
    replyCommentId: number | null = null,
  ) {
    return this.http.post<NewMessageModelResponse>('', {
      content,
      forumThreadId,
      replyCommentId,
    });
  }
}

export const messagesAPI = new ForumMessagesAPI();
