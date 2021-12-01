import block from 'bem-cn';
import React, { useEffect } from 'react'; // eslint-disable-line
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../../components/Header';
import { LeaderboardTable, LeaderboardTableColumn } from '../../components/LeaderboardTable';
import { PageContainer } from '../../components/PageContainer';
import { Title } from '../../components/Title';
import { fetchLeaderboardListData } from '../../store/leaderboard';
import { LeaderboardThunkDispatch } from '../../store/leaderboard/types';
import { AppState } from '../../store/types';

const b = block('ratings-page');

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
    <div className={b()}>
      <Header backButton={true}>
        <Title headingLevel={2} align="center">
          Таблица достижений игроков
        </Title>
      </Header>
      <PageContainer size="m">
        <LeaderboardTable columns={columns} data={usersList} />
      </PageContainer>
    </div>
  );
};
