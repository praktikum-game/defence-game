import React, { useCallback, useEffect, useState } from 'react';
import { Header } from '../../../components/Header';
import { ThreadsList } from '../components/ThreadsList';
import { Title } from '../../../components/Title';
import { Button } from '../../../components/Button';

import './forum-index-page.css';
import { PageContainer } from '../../../components/PageContainer';
import { forumTopicsAPI } from 'api/forum-topics/ForumTopicsAPI';
import { ForumThreadModel } from 'api/forum-topics';
import { AddThreadModal } from './AddThreadModal/AddThreadModal';
import { AppState } from 'store';
import { useSelector } from 'react-redux';
import { EditThreadModal } from './EditThreadModal';
import { ForumThreadCreationModel } from 'api/forum-topics/types';

export const ForumIndexPage = () => {
  const userData = useSelector((state: AppState) => state.user.data);

  const [list, setList] = useState<Array<ForumThreadModel>>([]);
  const [addModalIsVisible, setAddModalIsVisible] = useState(false);
  const [editModalIsVisible, setEditModalIsVisible] = useState(false);
  const [editData, setEditData] = useState<ForumThreadCreationModel & { id: number }>();

  useEffect(() => {
    forumTopicsAPI.fetch().then((data) => {
      setList(data.data);
    });
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setAddModalIsVisible(false);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setEditModalIsVisible(false);
  }, []);

  const handleCreateThreadClick = useCallback(() => {
    setAddModalIsVisible(true);
  }, []);

  const handleTopicRemoveClick = async (id: number) => {
    await forumTopicsAPI.remove(id);
  };

  const handleTopicEditClick = async (id: number) => {
    const { data } = await forumTopicsAPI.fetchById(id);
    setEditData({ id: data.id, content: data.content, subject: data.subject });
    setEditModalIsVisible(true);
  };
  const handleChangeField = useCallback((field: keyof ForumThreadCreationModel, value: string) => {
    setEditData((prev) => {
      if (prev) {
        return { ...prev, [field]: value };
      }
    });
  }, []);
  const handleTopicSaveEditedData = useCallback(async () => {
    if (editData) {
      const { id, ...other } = editData;
      await forumTopicsAPI.edit(id, other);
    }
  }, [editData]);

  return (
    <>
      <AddThreadModal visible={addModalIsVisible} onClose={handleCloseAddModal} />
      <EditThreadModal
        visible={editModalIsVisible}
        onClose={handleCloseEditModal}
        data={editData}
        onChange={handleChangeField}
        onSaveData={handleTopicSaveEditedData}
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
          {list.map((el) => (
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
