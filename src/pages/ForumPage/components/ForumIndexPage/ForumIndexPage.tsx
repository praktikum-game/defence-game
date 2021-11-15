import React from 'react';
import { Avatar } from '../../../../components/Avatar';

import { Title } from '../../../../components/Title';

export const ForumIndexPage = () => (
  <>
    <h2>Главная страница форума</h2>
    <div>
      <div>
        <div>
          <Avatar></Avatar>
          <div>
            <Title align="left" headingLevel={3}>
              Мой сладкий сахар
            </Title>
            <span>sdfafadsf</span>
            <span>213</span>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </>
);
