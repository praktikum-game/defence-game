import React from 'react';
import block from 'bem-cn';
import { Link } from 'react-router-dom';
import { AppNavigation } from '../../components/AppNavigation';
import { Button } from '../../components/Button';
import './homePage.css';
import { Logo } from '../../components/Logo';
import hobart from './static/hobart.svg';
import { Title } from '../../components/Title';

import medic from './static/medic.png';
import viruses from './static/viruses.png';
import bankomat from './static/bankomat.png';

const b = block('home-page');
const h = block('main-header');
const c = block('card');

export const HomePage = () => (
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
