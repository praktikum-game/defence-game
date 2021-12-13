import { useCallback } from 'react';

import { oauthApi } from 'api/oauth';
import { OAUTH_REDIRECT_URL } from '../../consts';

export const useOAuth = () => {
  const startOAuth = useCallback(async () => {
    const { data } = await oauthApi.getServiceId(OAUTH_REDIRECT_URL);
    const link = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${data.service_id}&redirect_uri=${OAUTH_REDIRECT_URL}`;
    window.location.href = link;
  }, []);

  return startOAuth;
};
