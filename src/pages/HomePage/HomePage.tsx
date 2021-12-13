import React, { useEffect } from 'react';
import block from 'bem-cn';
import { Link, useNavigate } from 'react-router-dom';
import { AppNavigation } from '../../components/AppNavigation';
import { Button } from '../../components/Button';
import './homePage.css';
import { Logo } from '../../components/Logo';
import hobart from './static/hobart.svg';
import { Title } from '../../components/Title';

import medic from './static/medic.png';
import viruses from './static/viruses.png';
import bankomat from './static/bankomat.png';
import { useDispatch } from 'react-redux';
import { oauthApi } from 'api/oauth';
import { OAUTH_REDIRECT_URL } from 'consts';
import { AxiosError } from 'axios';
import { getUserData } from 'store/user/actions/action-creators';

const b = block('home-page');
const h = block('main-header');
const c = block('card');

export const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function checkOAuthUser() {
      if (window.location.search) {
        // если в адресной строке есть searchParams, то значит прелетел код от OAuth
        let searchString = window.location.search;
        const token = searchString.replace(/\D+/gi, '');
        try {
          // проверка access-кода
          const { status } = await oauthApi.oauth({
            code: token,
            redirect_uri: OAUTH_REDIRECT_URL,
          });
          if (status === 200) {
            //все норм - получаем пользователя
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
      }
    }

    checkOAuthUser();
    navigate('/'); // убираем query праметр, чтобы не мешался.
  }, []);
  return (
    <div className={b()}>
      <div className={h()}>
        <div className={h('wrapper')}>
          <div className={h('hobart')}>
            <img src={hobart} alt="Hobart" />
          </div>
          <Logo className={h('logo')} />
        </div>
        <div className={h('banner-text')}>
          <h1>
            Защити <span>МИР</span> от вирусов&nbsp;!
          </h1>
          <p>Почувствуй на своей шкуре, каково сейчас докторам&nbsp;... </p>
        </div>
        <div className={h('buttons')}>
          <Link className="button__link" to="/login">
            <Button text="Вход" view="info" />
          </Link>
          <Link className="button__link" to="/register">
            <Button text="Регистрация" view="info" />
          </Link>
        </div>
      </div>
      <div className="page-layout">
        <div className={(c(), c({ left: true }))}>
          <div className={c('image')}>
            <img src={medic} alt="Врач" />
          </div>
          <div className={c('text')}>
            <Title headingLevel={3} align="left" className={c('title')}>
              Расставляй медиков по клеткам.
            </Title>
            <p className={c('info')}>Не забывай использовать маску и антисептик</p>
          </div>
        </div>
        <div className={(c(), c({ right: true }))}>
          <div className={c('image')}>
            <img src={viruses} alt="Вирусы" />
          </div>
          <div className={c('text')}>
            <Title headingLevel={3} align="left" className={c('title')}>
              Выдержи натиск злобных вирусов.
            </Title>
            <p className={c('info')}>Они постоянно мутируют и пытаются прорвать защиту</p>
          </div>
        </div>
        <div className={(c(), c({ left: true }))}>
          <div className={c('image')}>
            <img src={bankomat} alt="Банкомат>" />
          </div>
          <div className={c('text')}>
            <Title headingLevel={3} align="left" className={c('title')}>
              Ставь больше банкоматов, чтобы зарабатывать больше денег.
            </Title>
            <p className={c('info')}>Это мотивирует медиков отверженно сражаться</p>
          </div>
        </div>
        <Link className="button__link" to="/game">
          <Button className={b('button')} text="Начать игру" />
        </Link>
        <div className="main-footer">
          <AppNavigation />
        </div>
      </div>
    </div>
  );
};
