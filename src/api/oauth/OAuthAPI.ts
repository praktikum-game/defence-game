import { BaseAPI } from 'api/BaseAPI';
import { localBaseUrl, praktikumBaseUrl } from 'api/consts';
import { OAuthRequest, OAuthServiceId } from './types';

class OAuthAPI extends BaseAPI {
  constructor(baseUrl: string) {
    super('/oauth/yandex', baseUrl);
  }

  getServiceId(redirectUri: string) {
    return this.http.get<OAuthServiceId>('/service-id', { params: { redirect_uri: redirectUri } });
  }

  oauth(oauthRequest: OAuthRequest) {
    return this.http.post('', oauthRequest);
  }
}

export const localOauthApi = new OAuthAPI(localBaseUrl);
export const praktikumOauthApi = new OAuthAPI(praktikumBaseUrl);
