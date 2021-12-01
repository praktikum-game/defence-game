import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../../components/Header';
import { PageContainer } from '../../../components/PageContainer';
import { Title } from '../../../components/Title';

export const ForumThreadPage = () => {
  const { forumId } = useParams();

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
    </>
  );
};
