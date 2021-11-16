import React from 'react';
import { useParams } from 'react-router-dom';

export const ForumThreadPage = () => {
  const { forumId } = useParams();

  return (
    <>
      <h2>Тема на форуме {forumId} </h2>
      <p>текст этой темы</p>
    </>
  );
};
