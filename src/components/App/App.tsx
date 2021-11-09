import React, { FC } from 'react';
import { Link } from '../Link';
import './App.css';

const App: FC = () => (
  <div className="title">
    <h1>Мое супер приложение</h1>
    <Link href="test">Link name</Link>
  </div>
);

export default App;
