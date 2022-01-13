import React, { useCallback, useEffect, useState } from 'react';
import { Header } from '../../../components/Header';
import { ThreadsList } from '../components/ThreadsList';
import { Title } from '../../../components/Title';
import { Button } from '../../../components/Button';

import './forum-index-page.css';
import { PageContainer } from '../../../components/PageContainer';
import { forumTopicsAPI } from 'api/forum-topics/ForumTopicsAPI';
import { ForumThreadModel } from 'api/forum-topics';
import { UpsertThreadModal } from './UpsertThreadModal/UpsertThreadModal';
import { AppState } from 'store';
import { useSelector } from 'react-redux';
import { ForumThreadCreationModel } from 'api/forum-topics/types';

const defaultValue: ForumThreadCreationModel = { content: '', subject: '' };
export const ForumIndexPage = () => {
  const userData = useSelector((state: AppState) => state.user.data);

  const [topicsList, setTopicsList] = useState<Array<ForumThreadModel>>([]);
  const [addModalIsVisible, setAddModalIsVisible] = useState(false);
  const [recordData, setRecordData] = useState<ForumThreadCreationModel>(defaultValue);
  const [recordId, setRecordId] = useState<number>();

  useEffect(() => {
    forumTopicsAPI.fetch().then((data) => {
      setTopicsList(data.data);
    });
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setRecordId(undefined);
    setRecordData(defaultValue);
    setAddModalIsVisible(false);
  }, []);

  const handleCreateThreadClick = useCallback(() => {
    setAddModalIsVisible(true);
  }, []);

  const handleTopicRemoveClick = async (id: number) => {
    await forumTopicsAPI.remove(id);
    const { data } = await forumTopicsAPI.fetch();
    setTopicsList(data);
  };

  const handleTopicEditClick = async (id: number) => {
    const { data } = await forumTopicsAPI.fetchById(id);
    setRecordData({ content: data.content, subject: data.subject });
    setRecordId(data.id);
    setAddModalIsVisible(true);
  };
  const handleChangeField = useCallback((field: keyof ForumThreadCreationModel, value: string) => {
    setRecordData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSaveData = useCallback(async () => {
    if (recordData) {
      if (recordId) {
        await forumTopicsAPI.edit(recordId, recordData);
      } else {
        await forumTopicsAPI.create(recordData);
      }
    }

    setAddModalIsVisible(false);
    const { data } = await forumTopicsAPI.fetch();
    setTopicsList(data);
  }, [recordData, recordId]);

  return (
    <>
      <UpsertThreadModal
        data={recordData}
        visible={addModalIsVisible}
        onClose={handleCloseAddModal}
        onSaveData={handleSaveData}
        onChange={handleChangeField}
      />

      <Header backButton={true}>
        <Title headingLevel={2} align="center">
          Темы для обсуждений
        </Title>
        <Button
          text="Создать новую тему"
          view="secondary"
          className="create-new-theme-button"
          onClick={handleCreateThreadClick}
        />
      </Header>
      <PageContainer size="l">
        <ThreadsList>
          {topicsList.map((el) => (
            <ThreadsList.Item
              key={el.id}
              dataItem={el}
              isAuthor={userData ? userData.id === el.userId : false}
              onEditClick={handleTopicEditClick}
              onRemoveClick={handleTopicRemoveClick}
            />
          ))}
        </ThreadsList>
      </PageContainer>
    </>
  );
};
