import { BaseAPI } from '../BaseAPI';
import { OAuthRequest, OAuthServiceId } from './types';

class OAuthAPI extends BaseAPI {
  constructor() {
    super('/oauth/yandex');
  }

  getServiceId(redirectUri = 'http://localhost:3000') {
    return this.http.get<OAuthServiceId>('/service-id');
  }

  oauth(oauthRequest: OAuthRequest) {
    return this.http.post('', { ...oauthRequest });
  }
}

export const oauthApi = new OAuthAPI();
