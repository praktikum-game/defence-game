import { authAPI } from 'api/auth';
import { oauthApi } from 'api/oauth';
import { AxiosError } from 'axios';
import React, { useEffect, useCallback } from 'react';
import { OAUTH_REDIRECT_URL } from '../../consts';

export const useOAuth = () => {
  useEffect(() => {
    async function checkOAuthUser() {
      if (window.location.search) {
        let searchString = window.location.search;
        // setToken(searchString.replace(/\D+/gi, ''));
        const token = searchString.replace(/\D+/gi, '');
        try {
          const { status } = await oauthApi.oauth({
            code: token,
            redirect_uri: OAUTH_REDIRECT_URL,
          });
          if (status === 200) {
            const response = await authAPI.userRead();
            // setUserData(response.data);
          }
        } catch (e: unknown) {
          const error = e as AxiosError;
          if (error.response) {
            if (error.response.status === 400) {
              const response = await authAPI.userRead();
              // setUserData(response.data);
            }
          }
        }
      }
    }

    checkOAuthUser();
  }, []);

  const startOAuth = useCallback(async () => {
    const { data } = await oauthApi.getServiceId(OAUTH_REDIRECT_URL);
    const link = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${data.service_id}&redirect_uri=${OAUTH_REDIRECT_URL}`;
    window.location.href = link;
  }, []);

  return { startOAuth };
};
