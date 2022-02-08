import { useEffect, useCallback } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserData } from 'store/user/actions/action-creators';
import { AxiosError } from 'axios';
import { localOauthApi } from 'api/oauth/OAuthAPI';

export const useOAuth = (redirectUri: string, clientId: string) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startOAuth = useCallback(async () => {
    const link = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = link;
  }, [redirectUri, clientId]);

  useEffect(() => {
    async function checkOAuthUser() {
      const searchParams = new URL(document.location.href).searchParams;
      let oauthCode = searchParams.get('code');
      if (oauthCode !== null) {
        try {
          const { status } = await localOauthApi.oauth({
            code: oauthCode,
            redirect_uri: redirectUri,
          });
          if (status === 200 || status === 202) {
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
    // Ругается на то, что надо передать dispatch, navigate и redirectUri в массив
    // А мы хотим ее исполнить только один раз после рендеринга, а не при обновлении пропсов
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return startOAuth;
};
