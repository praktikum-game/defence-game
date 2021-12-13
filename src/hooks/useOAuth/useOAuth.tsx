import { useCallback } from 'react';

import { oauthApi } from 'api/oauth';

export const useOAuth = (redirectUri: string) => {
  const startOAuth = useCallback(async () => {
    const { data } = await oauthApi.getServiceId(redirectUri);
    const link = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${data.service_id}&redirect_uri=${redirectUri}`;
    window.location.href = link;
  }, [redirectUri]);

  return startOAuth;
};
