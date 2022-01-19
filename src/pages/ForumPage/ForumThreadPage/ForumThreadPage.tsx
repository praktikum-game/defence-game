import React, { useCallback, useEffect, useState } from 'react';
import block from 'bem-cn';

import { PageContainer } from '../../../components/PageContainer';
import { messagesAPI } from '../../../api/forum-messages';
import { Header } from '../../../components/Header';
import { Title } from '../../../components/Title';
import { MessagesList } from '../components/MessagesList';
import { Button } from '../../../components/Button';
import { InputField } from '../../../components/InputField';

import './forum-thread-page.css';
import { getHistory } from 'utilities/history';
import { MessageModel } from 'api/forum-messages/types';
import { ForumItem, MessageItem } from './types';
import { useAuthUser } from 'hooks/useAuthUser';
import { isServer } from 'utilities';
import { UpsertMessageModal } from './UpsertMessageModal';
import { ForumThreadModel, forumTopicsAPI } from 'api/forum-topics';

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

function parseThreadItem(data: ForumThreadModel) {
  const { subject, content, createdAt, userId, id, user } = data;
  return { subject, content, createdAt: new Date(createdAt), userId, id, userName: user.name };
}

export const ForumThreadPage = () => {
  const [rootMessages, setRootMessages] = useState<MessageItem[]>([]);
  const [replyMessages, setReplyMessages] = useState<{ [key in number]: MessageItem[] }>([]);

  const [forumThread, setForumThread] = useState<ForumItem>({
    id: 0,
    subject: '',
    content: 'Данные загружаются. Пожалуйста, подождите',
    createdAt: new Date(Date.now()),
    userId: 0,
    userName: '',
  });
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string>('');

  const [forumId, setForumId] = useState<number | null>(null);
  const [replyMessageId, setReplyMessageId] = useState<number | null>(null);
  const [addModalIsVisible, setAddModalIsVisible] = useState(false);

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
        if (forumId === null) {
          // eslint-disable-next-line no-console
          console.log(`Couldn't get proper forumId`);
          return;
        }
        const data = await messagesAPI.fetchMessagesData(forumId);
        const forumData = await forumTopicsAPI.fetchById(forumId);
        const parsedMessages = parseMessagesItem(data.data);
        const parsedRootMessages = parsedMessages.filter(
          (message: MessageItem) => message.replyCommentId === null,
        );
        const defaultValue: { [key in number]: MessageItem[] } = {};
        const newReplyMessages = parsedRootMessages.reduce((prev, rootMessage) => {
          prev[rootMessage.id] = parsedMessages.filter(
            (replyMessage: MessageItem) => rootMessage.id === replyMessage.replyCommentId,
          );
          return prev;
        }, defaultValue);

        setReplyMessages(newReplyMessages);
        setRootMessages(parsedRootMessages);
        setForumThread(parseThreadItem(forumData.data));
      } finally {
      }
    }
    getData();
  }, [forumId, setRootMessages, setForumThread, setReplyMessages]);

  const handleInputMessageText: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setCurrentMessage(e.target.value);
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setReplyMessageId(null);
    setModalMessage('');
    setAddModalIsVisible(false);
  }, []);

  const handleSendMessageClick = useCallback(
    async (inputMessage: string) => {
      try {
        const data = await messagesAPI.postNewMessage(inputMessage, forumThread.id, replyMessageId);
        const { id, createdAt, replyCommentId, content } = data.data;
        const newMessage: MessageItem = {
          id,
          content,
          createdAt: new Date(createdAt),
          replyCommentId,
          user: { id: userData!.id, avatar: userData!.avatar, name: userData!.login },
        };

        if (replyCommentId === null) {
          setReplyMessages((prev) => {
            prev[id] = [];
            return prev;
          });
          setRootMessages((prev) => [...prev, newMessage]);
        } else {
          setReplyMessages((prev) => {
            prev[replyCommentId].push(newMessage);
            return prev;
          });
        }
        handleCloseAddModal();
        setCurrentMessage('');
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    },
    [userData, forumThread.id, replyMessageId, handleCloseAddModal],
  );

  const handleChangeField = useCallback((value: string) => {
    setModalMessage(value);
  }, []);

  const handleReplyMessageClick = useCallback((replyId: number) => {
    setReplyMessageId(replyId);
    setAddModalIsVisible(true);
  }, []);

  return (
    <>
      <UpsertMessageModal
        data={modalMessage}
        visible={addModalIsVisible}
        onClose={handleCloseAddModal}
        onSaveData={() => handleSendMessageClick(modalMessage)}
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
              content: forumThread.content,
              userName: forumThread.userName,
              userAvatar: null,
            }}
          />
          {rootMessages.map((el: MessageItem) => {
            const currentReplies = replyMessages[el.id];
            const rootMessage = (
              <MessagesList.Message
                key={JSON.stringify(el)}
                messageData={{
                  date: el.createdAt,
                  content: el.content,
                  userName: el.user.name,
                  userAvatar: el.user.avatar,
                }}
                replyClick={() => handleReplyMessageClick(el.id)}
              />
            );
            if (currentReplies.length > 0) {
              const withReplies = currentReplies.map((replyMessage) => (
                <MessagesList.Message
                  // React ругается, что не уникальный key. Что может быть не так?
                  // Не могу сделать уникальным
                  key={JSON.stringify(replyMessage)}
                  messageData={{
                    date: replyMessage.createdAt,
                    content: replyMessage.content,
                    userName: replyMessage.user.name,
                    userAvatar: replyMessage.user.avatar,
                  }}
                  isReply={true}
                />
              ));
              return (
                <>
                  {rootMessage}
                  {withReplies}
                </>
              );
            }
            return rootMessage;
          })}
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
            onClick={() => handleSendMessageClick(currentMessage)}
          />
        </div>
      </PageContainer>
    </>
  );
};
