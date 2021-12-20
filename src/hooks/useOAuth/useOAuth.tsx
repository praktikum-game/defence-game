import { useEffect, useCallback } from 'react';

import { oauthApi } from 'api/oauth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserData } from 'store/user/actions/action-creators';
import { AxiosError } from 'axios';

export const useOAuth = (redirectUri: string) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startOAuth = useCallback(async () => {
    const { data } = await oauthApi.getServiceId(redirectUri);
    const link = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${data.service_id}&redirect_uri=${redirectUri}`;
    window.location.href = link;
  }, [redirectUri]);

  useEffect(() => {
    async function checkOAuthUser() {
      const searchParams = new URL(document.location.href).searchParams;
      let oauthCode = searchParams.get('code');
      if (oauthCode !== null) {
        try {
          const { status } = await oauthApi.oauth({
            code: oauthCode,

            redirect_uri: redirectUri,
          });
          if (status === 200) {
            dispatch(getUserData());
          }
        } catch (e: unknown) {
          // если ошибка при получении токена, значит пользователя уже залогинен не по  oauth
          const error = e as AxiosError;
          if (error.response) {
            if (error.response.status === 400) {
              dispatch(getUserData());
            }
          }
        }
        navigate('/');
      }
    }

    checkOAuthUser();
    // eslint-disable-next-line
  }, []);

  return startOAuth;
};
