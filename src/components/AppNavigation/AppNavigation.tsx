import React from 'react';
import { NavLink } from 'react-router-dom';
import { defaultNavigation } from './defaultNavigation';
import './appNavigation.css';

export const AppNavigation = () => {
  const className = 'app-navigation__item';
  const linkItems = defaultNavigation.map((item, i) => (
    <li key={i}>
      <NavLink
        className={({ isActive }) => (isActive ? `${className} ${className}_active` : '')}
        to={item.path}
      >
        {item.name}
      </NavLink>
    </li>
  ));

  return (
    <nav className="app-navigation">
      <ul>{linkItems}</ul>
    </nav>
  );
};
