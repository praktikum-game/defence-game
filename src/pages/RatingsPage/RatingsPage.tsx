import React, { useEffect } from 'react'; // eslint-disable-line
import { useSelector, useDispatch } from 'react-redux';
import { LeaderboardTable, LeaderboardTableColumn } from '../../components/LeaderboardTable';
import { fetchLeaderboardListData } from '../../store/leaderboard';
import { LeaderboardThunkDispatch } from '../../store/leaderboard/types';
import { AppState } from '../../store/types';

const columns: LeaderboardTableColumn[] = [
  { dataId: 'username', title: 'Имя пользователя' },
  { dataId: 'login', title: 'Логин' },
  { dataId: 'score', title: 'Количество очков' },
];
export const RatingsPage = () => {
  const dispatcher = useDispatch<LeaderboardThunkDispatch>();
  const usersList = useSelector((state: AppState) => state.leaderboard.usersList);

  useEffect(() => {
    dispatcher(fetchLeaderboardListData());
  }, []);

  return (
    <>
      <h1>Таблица достижений игроков</h1>
      <LeaderboardTable columns={columns} data={usersList} />
    </>
  );
};
