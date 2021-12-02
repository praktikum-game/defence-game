import React, { useCallback, useEffect, useState } from 'react';
import block from 'bem-cn';

import { PageContainer } from '../../../components/PageContainer';
import { MessageItem, messagesAPI } from '../../../api/forum-messages';
import { Header } from '../../../components/Header';
import { Title } from '../../../components/Title';
import { MessagesList } from '../components/MessagesList';
import { Button } from '../../../components/Button';
import { InputField } from '../../../components/InputField';
import { nanoid } from 'nanoid';

import './forum-thread-page.css';

const b = block('thread-page');

export const ForumThreadPage = () => {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');

  useEffect(() => {
    async function getData() {
      const data = await messagesAPI.fetchMessagesData();
      setMessages(data.data);
    }
    getData();
  }, []);

  const handleInputMessageText: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setCurrentMessage(e.target.value);
  }, []);

  const handleSendMessageClick = useCallback(() => {
    setMessages((messages) => [
      ...messages,
      { id: nanoid(), date: Date(), user: 'Доцент', text: currentMessage },
    ]);
    setCurrentMessage('');
  }, []);

  return (
    <>
      <Header backButton={true}>
        <Title headingLevel={2} align="center">
          Тема на форуме
        </Title>
      </Header>
      <PageContainer size="l">
        <MessagesList className={b('messages_list')}>
          {messages.map((el) => (
            <MessagesList.Message key={el.id} message={el} />
          ))}
        </MessagesList>
        <div>
          <InputField
            placeholder="Введите сообщение..."
            value={currentMessage}
            onInput={handleInputMessageText}
          />
          <Button disabled={!currentMessage} text="Отправить" onClick={handleSendMessageClick} />
        </div>
      </PageContainer>
    </>
  );
};
