import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../../components/Header';
import { PageContainer } from '../../../components/PageContainer';
import { Title } from '../../../components/Title';
import React, { useEffect, useState } from 'react';
import { MessageItem, messagesAPI } from '../../../api/forum-messages';
import { Header } from '../../../components/Header';
import { Title } from '../../../components/Title';
import { MessagesList } from '../components/MessagesList';

export const ForumThreadPage = () => {
  const [messages, setMessages] = useState<MessageItem[]>([]);

  useEffect(() => {
    async function getData() {
      const data = await messagesAPI.fetchMessagesData();
      console.log('data', data.data);
      setMessages(data.data);
    }
    getData();
  }, []);

  return (
    <>
      <Header backButton={true}>
        <Title headingLevel={2} align="center">
          Тема на форуме {forumId}
        </Title>
      </Header>
      <PageContainer size="l">
        <p>
          Загрузчики модулей могут быть связаны. Каждый загрузчик в цепочке применяет преобразования
          к обработанному ресурсу. Цепочка выполняется в обратном порядке. Первый загрузчик передает
          свой результат (ресурс с примененными преобразованиями) следующему и так далее. Наконец,
          webpack ожидает, что JavaScript будет возвращен последним загрузчиком в цепочке.
        </p>
      </PageContainer>
          <div>Тема</div>
          <div>создал</div>
        </Title>
      </Header>
      <p>Thread</p>
      <MessagesList>
        {messages.map((el) => (
          <MessagesList.Message key={el.id} message={el} />
        ))}
      </MessagesList>
    </>
  );
};
