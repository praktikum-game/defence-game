import { AxiosError } from 'axios';
import { authAPI } from 'client/api/auth';
import { oauthApi } from 'client/api/oauth';
import React, { useEffect, useState } from 'react';
import './style.css';
export const OAuthSsrPage = () => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (window.location.search) {
      let searchString = window.location.search;
      setToken(searchString.replace(/\D+/gi, ''));
    }
  }, []);

  const handleGetServiceIdButtonClick = async () => {
    const { data } = await oauthApi.getServiceId();
    const REDIRECT_URI = 'http://localhost:3000';
    const link = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${data.service_id}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = link;
  };

  const handleOAuthButtonClick = async () => {
    try {
      const { status } = await oauthApi.oauth({
        code: token,
        redirect_uri: 'http://localhost:3000',
      });
      if (status === 200) {
        const response = await authAPI.userRead();
        setUserData(response.data);
      }
    } catch (e: unknown) {
      const error = e as AxiosError;
      if (error.response) {
        if (error.response.status === 400) {
          const response = await authAPI.userRead();
          setUserData(response.data);
        }
      }
    }
  };
  return (
    <>
      <div>
        <p className="ssr-test-page">Привет! Я - SSR! Но я еще маленький</p>
        <p className="ssr-test-page"> Но я уже умею в OAuth</p>
      </div>
      <div>
        <button onClick={handleGetServiceIdButtonClick}>1. GetServiceId & OAuth</button>
        <p>{token}</p>
      </div>
      <div>
        <button onClick={handleOAuthButtonClick}>2. GetUserInfo</button>
      </div>
      <div>
        <span>User data:</span>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      </div>
    </>
  );
};
