import React from 'react';
import { useParams } from 'react-router-dom';

export const ForumThreadPage = (): JSX.Element => {
  let { forumId } = useParams();
  console.log(forumId);

  return (
    <>
      <h1>Тема на форуме {forumId} </h1>
      <p>текст тут</p>
    </>
  );
};
