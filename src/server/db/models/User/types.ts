import { Optional, Model } from 'sequelize';
import { CommentAttributes, CommentCreationAttributes } from '../Comment';
import { ForumThreadAttributes, ForumThreadCreationAttributes } from '../ForumThread';
import { SiteThemeAttributes, SiteThemeCreationAttributes } from '../SiteTheme';

export interface UserAttributes {
  id: number;
  praktikumId: number;

  comments?: Model<CommentAttributes, CommentCreationAttributes>[];
  forum_threads?: Model<ForumThreadAttributes, ForumThreadCreationAttributes>[];
  current_theme: Model<SiteThemeAttributes, SiteThemeCreationAttributes>;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
