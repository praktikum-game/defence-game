import React from 'react';
import { LeaderboardTable, LeaderboardTableProps } from '../../components/LeaderboardTable';

const tableData: LeaderboardTableProps = {
  columns: [
    { dataId: 'username', title: 'Имя пользователя' },
    { dataId: 'login', title: 'Логин' },
    { dataId: 'score', title: 'Колиество очков' },
  ],

  data: [
    { id: 'a123', login: 'vasya', username: 'Василий Алибабаевич', score: 168 },
    { id: 'a124', login: 'kosoy', username: 'Косой', score: 202 },
    { id: 'a125', login: 'hmyr', username: 'Хмырь', score: 386 },
    { id: 'a126', login: 'docent', username: 'Доцент', score: 409 },
  ],
};

export const RatingsPage = (): JSX.Element => (
  <>
    <h1>Таблица достижений игроков</h1>
    <LeaderboardTable {...tableData} className="hoho" />
  </>
);
