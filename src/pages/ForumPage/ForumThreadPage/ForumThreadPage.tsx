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
  return parsed.sort(
    (left, right) => left.createdAt.getMilliseconds() - right.createdAt.getMilliseconds(),
  );
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
        const data = await messagesAPI.fetchMessagesData(forumId, 0, 100);
        setMessages(parseMessagesItem(data.data));
        setForumThread(parseThreadItem(data.data));
      } catch (e) {
        console.log(e);
        setMessages([]);
      }
    }
    getData();
  }, [forumId]);

  const handleInputMessageText: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setCurrentMessage(e.target.value);
  }, []);

  const handleReplyMessage = useCallback(() => {}, []);

  const handleSendMessageClick = useCallback(
    async (inputReplyId: number | null = null) => {
      const newMessage = await messagesAPI.postNewMessage(
        currentMessage,
        forumThread.id,
        inputReplyId,
      );
      console.log(newMessage);
      const { id, createdAt, replyCommentId, content } = newMessage;

      setMessages((prev) => [
        ...prev,
        {
          id,
          content,
          createdAt: new Date(createdAt),
          replyCommentId,
          user: { id: userData!.id, avatar: userData!.avatar, name: userData!.login },
        },
      ]);
      setCurrentMessage('');
    },
    [currentMessage, userData, forumThread.id],
  );

  return (
    <>
      <Header backButton={true}>
        <Title headingLevel={2} align="center">
          {forumThread.subject}
        </Title>
      </Header>
      <PageContainer size="l">
        <MessagesList className={b('messages_list')}>
          <MessagesList.Message
            message={{
              date: forumThread.createdAt,
              text: forumThread.content,
              user: forumThread.userName,
            }}
          />
          {messages.map((el) => (
            <MessagesList.Message
              key={el.id}
              message={{ date: el.createdAt, text: el.content, user: el.user.name }}
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
