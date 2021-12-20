import { Optional } from 'sequelize';
import { Comment } from '../Comment';
import { ForumThread } from '../ForumThread';
import { SiteTheme } from '../SiteTheme';

export interface UserAttributes {
  id: number;
  backendId: number;
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  score?: number;

  comments?: typeof Comment[];
  forum_threads?: typeof ForumThread[];
  current_theme: typeof SiteTheme;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
