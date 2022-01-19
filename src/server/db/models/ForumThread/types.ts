import {  Optional } from 'sequelize';

export interface ForumThreadAttributes {
  id: number;
  content: string;
  subject: string;
  userId: number;
}

export interface ForumThreadCreationAttributes extends Optional<ForumThreadAttributes, 'id'> {}
