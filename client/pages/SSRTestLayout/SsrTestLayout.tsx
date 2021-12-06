import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const SsrTestLayout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">TestPage</Link>
          </li>
          <li>
            <Link to="/another">anoherTestPagte</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
};
