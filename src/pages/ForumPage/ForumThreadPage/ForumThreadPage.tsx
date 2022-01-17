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

const b = block('thread-page');

function parseMessagesItem(data: MessageModel[]) {
  const parsed: MessageItem[] = [];

  for (const message of data) {
    const { content, createdAt, id, replyCommentId, user } = message;
    console.log(createdAt);
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
  const history = getHistory();
  const { userData } = useAuthUser();

  let forumId: number;
  const regexForumId = history.location.pathname.match(/\d+/g);
  if (regexForumId !== null) {
    forumId = Number(regexForumId[0]);
  }

  useEffect(() => {
    async function getData() {
      try {
        const data = await messagesAPI.fetchMessagesData(forumId, 0, 1000);
        setMessages(parseMessagesItem(data.data));
        setForumThread(parseThreadItem(data.data));
      } catch (e) {
        console.log(e);
        setMessages([]);
      }
    }
    getData();
  }, []);

  const handleInputMessageText: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setCurrentMessage(e.target.value);
  }, []);

  const handleReplyMessage = useCallback(() => {}, []);

  const handleSendMessageClick = useCallback(
    async (replyId: number | null = null) => {
      const { commentId } = await messagesAPI.postNewMessage(userData!.id, currentMessage, forumThread.id, replyId);

      setMessages((messagesNew) => [
        ...messagesNew,
        {
          id: ,
          content: currentMessage,
          createdAt: new Date(Date.now()),
          replyCommentId: replyId,
          user: { id: userData!.id, avatar, name },
        },
      ]);
      setCurrentMessage('');
    },
    [currentMessage],
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
            onClick={handleSendMessageClick}
          />
        </div>
      </PageContainer>
    </>
  );
};
