import { BaseAPI } from 'api/BaseAPI';
import { localBaseUrl } from 'api/consts';
import { ForumThreadCreationModel, ForumThreadModel } from './types';

class ForumTopicsAPI extends BaseAPI {
  constructor() {
    super('/threads', localBaseUrl);
  }

  public fetch(offset: number = 0, limit: number = 10) {
    return this.http.get<Array<ForumThreadModel>>(`?offset=${offset}&limit=${limit}`);
  }

  public fetchById(id: number) {
    return this.http.get<ForumThreadModel>(`/${id}`);
  }

  public create(record: ForumThreadCreationModel) {
    return this.http.post('', record);
  }

  public remove(id: number) {
    return this.http.delete(`/${id}`);
  }

  public edit(id: number, data: ForumThreadCreationModel) {
    return this.http.patch(`/${id}`, data);
  }
}

export const forumTopicsAPI = new ForumTopicsAPI();
