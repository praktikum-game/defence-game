import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProfilePage } from '../../pages/ProfilePage';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import './App.css';
import { RegisterPage } from '../../pages/RegisterPage';
import { GamePage } from '../../pages/GamePage';
import { BoardPage } from '../../pages/BoardPage';
import { ForumPage } from '../../pages/ForumPage';

const App: FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/forum" element={<ForumPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
