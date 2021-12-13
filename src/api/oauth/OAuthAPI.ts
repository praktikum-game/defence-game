import { BaseAPI } from 'api/BaseAPI';
import { OAuthRequest, OAuthServiceId } from './types';

class OAuthAPI extends BaseAPI {
  constructor() {
    super('/oauth/yandex');
  }

  getServiceId(redirectUri: string) {
    return this.http.get<OAuthServiceId>('/service-id', { params: { redirect_uri: redirectUri } });
  }

  oauth(oauthRequest: OAuthRequest) {
    return this.http.post('', { ...oauthRequest });
  }
}

export const oauthApi = new OAuthAPI();
