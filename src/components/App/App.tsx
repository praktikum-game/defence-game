import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProfilePage } from '../../pages/ProfilePage';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { RegisterPage } from '../../pages/RegisterPage';
import { GamePage } from '../../pages/GamePage';
import { RatingsPage } from '../../pages/RatingsPage';
import { ForumPage } from '../../pages/ForumPage';
import { ForumThreadPage } from '../../pages/ForumThreadPage';
import { ErrorPage404 } from '../../pages/ErrorPage404';
import { ErrorPage500 } from '../../pages/ErrorPage500';
import './App.css';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="game" element={<GamePage />} />
          <Route path="ratings" element={<RatingsPage />} />
          <Route path="forum" element={<ForumPage />} />
          <Route path="forum/:forumId" element={<ForumThreadPage />} />
          <Route path="500" element={<ErrorPage500 />} />
          <Route path="*" element={<ErrorPage404 />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
