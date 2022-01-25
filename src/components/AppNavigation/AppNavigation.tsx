import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { block } from 'bem-cn';
import { defaultNavigation } from './defaultNavigation';

import { AppState } from 'store';

import './app-navigation.css';

const b = block('app-navigation');
const ni = block('navigation-item');

export const AppNavigation = () => {
  const user = useSelector((state: AppState) => state.user.data?.id);
  const linkItems = defaultNavigation
    .filter((f) => {
      if (user) {
        return f.showFor.signed === true;
      }
      if (user === undefined) {
        return f.showFor.anonim === true;
      }
    })
    .map(({ path, name, icon }, i) => (
      <li className={ni()} key={i}>
        <NavLink className={({ isActive }) => ni('link', { active: isActive })} to={path}>
          <i>{icon}</i>
          <span className={ni('text')}>{name}</span>
        </NavLink>
      </li>
    ));

  return (
    <nav className={b()}>
      <ul className={b('navigation-list')}>{linkItems}</ul>
    </nav>
  );
};
