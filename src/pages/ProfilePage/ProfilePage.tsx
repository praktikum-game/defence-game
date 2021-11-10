import React from 'react';

import './ProfilePage.css';

export const ProfilePage = (): JSX.Element => (
  <>
    <div className="profile-page">
      <div className="logo">
        <img src="/images/logo.png" alt="DoctorsVsViruses" />
      </div>
      <h1 className="profile-page_name">Страница профиля</h1>
      <p>Контент страницы</p>
    </div>
  </>
);
