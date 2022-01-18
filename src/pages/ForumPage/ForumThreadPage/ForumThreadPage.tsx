import React, { useCallback, useEffect, useState } from 'react';
import block from 'bem-cn';

import { PageContainer } from '../../../components/PageContainer';
import { MessageItem, messagesAPI } from '../../../api/forum-messages';
import { Header } from '../../../components/Header';
import { Title } from '../../../components/Title';
import { MessagesList } from '../components/MessagesList';
import { Button } from '../../../components/Button';
import { InputField } from '../../../components/InputField';

import './forum-thread-page.css';
import { getHistory } from 'utilities/history';
import { MessageModel } from 'api/forum-messages/types';
import { ForumItem } from './types';
import { useAuthUser } from 'hooks/useAuthUser';
import { isServer } from 'utilities';
import { UpsertMessageModal } from './UpsertMessageModal';

const b = block('thread-page');

function parseMessagesItem(data: MessageModel[]) {
  const parsed: MessageItem[] = [];

  for (const message of data) {
    const { content, createdAt, id, replyCommentId, user } = message;
    const { id: userId, avatar, name } = user;
    parsed.push({
      id,
      content,
      createdAt: new Date(createdAt),
      replyCommentId,
      user: { id: userId, avatar, name },
    });
  }
  return parsed;
}

function parseThreadItem(data: MessageModel[]) {
  const { subject, content, createdAt, userId, id } = data[0].forum_thread;
  const userName = data.filter((el) => el.user.id === userId)[0].user.name;
  return { subject, content, createdAt: new Date(createdAt), userId, id, userName };
}

export const ForumThreadPage = () => {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [forumThread, setForumThread] = useState<ForumItem>({
    id: 0,
    subject: 'Данных нет',
    content: 'Данных нет',
    createdAt: new Date(Date.now()),
    userId: 0,
    userName: 'Данных нет',
  });
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [forumId, setForumId] = useState<number | undefined>(undefined);

  const history = getHistory();
  const { userData } = useAuthUser();

  useEffect(() => {
    const pathname = isServer ? history.location.pathname : location.pathname;
    const regexForumId = pathname.match(/\d+/g);
    if (regexForumId !== null) {
      setForumId(Number(regexForumId[0]));
    }
  }, [setForumId, history.location.pathname]);

  useEffect(() => {
    async function getData() {
      try {
        if (forumId === undefined) {
          console.log(`Couldn't get proper forumId`);
          return;
        }
        const data = await messagesAPI.fetchMessagesData(forumId, 0, 1000);
        setMessages(parseMessagesItem(data.data));
        setForumThread(parseThreadItem(data.data));
      } catch (e) {
        console.log(e);
        setMessages([]);
      }
    }
    getData();
  }, [forumId, setMessages, setForumThread]);

  // useEffect(() => {
  //   console.log('Sorted!!!!');
  //   const newArray = [...messages];
  //   console.log(newArray);
  //   newArray.sort(
  //     (left, right) => left.createdAt.getMilliseconds() - right.createdAt.getMilliseconds(),
  //   );
  //   console.log(newArray);
  //   setMessages(newArray);
  // }, [messages, setMessages]);

  const handleInputMessageText: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setCurrentMessage(e.target.value);
  }, []);

  const handleSendMessageClick = useCallback(
    async (inputReplyId: number | null = null) => {
      try {
        const data = await messagesAPI.postNewMessage(currentMessage, forumThread.id, inputReplyId);
        const { id, createdAt, replyCommentId, content } = data.data;

        setMessages((prev) =>
          [
            ...prev,
            {
              id,
              content,
              createdAt: new Date(createdAt),
              replyCommentId,
              user: { id: userData!.id, avatar: userData!.avatar, name: userData!.login },
            },
          ].sort(
            (left, right) => left.createdAt.getMilliseconds() - right.createdAt.getMilliseconds(),
          ),
        );
        setCurrentMessage('');
      } catch (e) {
        console.log(e);
      }
    },
    [currentMessage, userData, forumThread.id],
  );

  const handleReplyMessage = useCallback(
    async (e: MouseEvent) => {
      const { currentTarget } = e;
      console.log(currentTarget);
      await handleSendMessageClick(10);
    },
    [handleSendMessageClick],
  );

  const [replyId, setReplyId] = useState<number | null>(null);

  const [addModalIsVisible, setAddModalIsVisible] = useState(false);

  const handleCloseAddModal = useCallback(() => {
    setReplyId(null);
    setCurrentMessage('');
    setAddModalIsVisible(false);
  }, []);

  const handleChangeField = useCallback((field: keyof ForumThreadCreationModel, value: string) => {
    setRecordData((prev) => ({ ...prev, [field]: value }));
  }, []);

  return (
    <>
      <UpsertMessageModal
        data={currentMessage}
        visible={addModalIsVisible}
        onClose={handleCloseAddModal}
        onSaveData={handleSaveData}
        onChange={handleChangeField}
      />

      <Header backButton={true}>
        <Title headingLevel={2} align="center">
          {forumThread.subject}
        </Title>
      </Header>
      <PageContainer size="l">
        <MessagesList className={b('messages_list')}>
          <MessagesList.Message
            messageData={{
              date: forumThread.createdAt,
              text: forumThread.content,
              user: forumThread.userName,
            }}
          />
          {messages.map((el) => (
            <MessagesList.Message
              key={el.id}
              messageData={{ date: el.createdAt, text: el.content, user: el.user.name }}
              replyClick={handleReplyMessage}
            />
          ))}
        </MessagesList>
        <div>
          <InputField
            placeholder="Введите сообщение..."
            value={currentMessage}
            onInput={handleInputMessageText}
          />
          <Button
            disabled={!currentMessage || !userData}
            text="Отправить"
            onClick={() => handleSendMessageClick()}
          />
        </div>
      </PageContainer>
    </>
  );
};
