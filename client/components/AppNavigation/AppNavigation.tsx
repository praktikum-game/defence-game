import React from 'react';
import { NavLink } from 'react-router-dom';
import { block } from 'bem-cn';
import { defaultNavigation } from './defaultNavigation';
import './appNavigation.css';

const b = block('app-navigation');

export const AppNavigation = () => {
  const linkItems = defaultNavigation.map(({ path, name }, i) => (
    <li key={i}>
      <NavLink className={({ isActive }) => b('item', { active: isActive })} to={path}>
        {name}
      </NavLink>
    </li>
  ));

  return (
    <nav className={b()}>
      <ul>{linkItems}</ul>
    </nav>
  );
};
