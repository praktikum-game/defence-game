import { BaseAPI } from 'api/BaseAPI';
import { ForumThreadCreationModel, ForumThreadModel, ForumThreadUpdateModel } from './types';

class ForumTopicsAPI extends BaseAPI {
  constructor() {
    super('/threads', 'https://local.ya-praktikum.tech/api/v1');
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

  public edit(id: number, data: ForumThreadUpdateModel) {
    return this.http.patch(`/${id}`, data);
  }
}

export const forumTopicsAPI = new ForumTopicsAPI();
