import React, { useCallback, useEffect, useState } from 'react';
import { Header } from '../../../components/Header';
import { ThreadsList } from '../components/ThreadsList';
import { Title } from '../../../components/Title';
import { Button } from '../../../components/Button';
import { ThreadListItemData } from '../components/ThreadsList/ThreadListItem';

import './forum-index-page.css';
import { PageContainer } from '../../../components/PageContainer';

const mockData: Array<ThreadListItemData> = [
  {
    createdDate: new Date(),
    createdUser: 'Доцент',
    headerText: 'Как вспомнить, где шлем?',
    lastChange: new Date(),
    messagesCount: 4,
    threadId: 'f123',
  },
  {
    createdDate: new Date(),
    createdUser: 'Хмырь',
    headerText: 'Лечение горла. Мой способ',
    lastChange: new Date(),
    messagesCount: 45,
    threadId: 'f124',
  },
  {
    createdDate: new Date(),
    createdUser: 'Косой',
    headerText: 'Пожалуйста, подскажите, как ходит конь',
    lastChange: new Date(),
    messagesCount: 17,
    threadId: 'f127',
  },
  {
    createdDate: new Date(),
    createdUser: 'Василий Алибабаевич',
    headerText: 'Как заработать червонец?',
    lastChange: new Date(),
    messagesCount: 9,
    threadId: 'f1238',
  },
];

export const ForumIndexPage = () => {
  const [list, setList] = useState<Array<ThreadListItemData>>([]);

  useEffect(() => {
    setList(mockData);
  }, []);

  const handleCreateNewThreadButtonClick = useCallback(() => {
    alert('create new forum thread');
  }, []);

  return (
    <>
      <Header backButton={true}>
        <Title headingLevel={2} align="center">
          Темы для обсуждений
        </Title>
        <Button
          text="Создать новую тему"
          view="secondary"
          className="create-new-theme-button"
          onClick={handleCreateNewThreadButtonClick}
        />
      </Header>
      <PageContainer size="l">
        <ThreadsList>
          {list.map((el) => (
            <ThreadsList.Item key={el.threadId} dataItem={el} />
          ))}
        </ThreadsList>
      </PageContainer>
    </>
  );
};
