import { ModelDefined } from 'sequelize/types';
import { CommentAttributes, CommentCreationAttributes } from './models/Comment';
import { ForumThreadAttributes, ForumThreadCreationAttributes } from './models/ForumThread';
import { SiteThemeAttributes, SiteThemeCreationAttributes } from './models/SiteTheme';
import { commentService, forumThreadService, siteThemeService, userService } from './services';

export async function addTestSamples() {
  // Чтобы сильно не заморачиваться с дублирующимися данными, просто делаю такую
  // проверку
  const existedThemes = await siteThemeService.readAll();
  if (existedThemes.length !== 0) {
    console.log('Data exits. No need to add');
    return;
  }

  await siteThemeService.bulkCreate([{ theme: 'light' }, { theme: 'dark' }]);

  const lightTheme = (await siteThemeService.readById(0)) as unknown as ModelDefined<
    SiteThemeAttributes,
    SiteThemeCreationAttributes
  >;

  const darkTheme = (await siteThemeService.readById(1)) as unknown as ModelDefined<
    SiteThemeAttributes,
    SiteThemeCreationAttributes
  >;

  await commentService.bulkCreate([
    { content: 'TestComment1', reply_comment: null },
    { content: 'TestComment2', reply_comment: null },
  ]);
  const commentTest = commentService.readById(0) as unknown as ModelDefined<
    CommentAttributes,
    CommentCreationAttributes
  >;
  await commentService.bulkCreate([{ content: 'TestComment3', reply_comment: commentTest }]);
  const allComments = (await commentService.readAll()) as unknown as ModelDefined<
    CommentAttributes,
    CommentCreationAttributes
  >[];

  await forumThreadService.create({
    content: 'ForumContent1',
    subject: 'ForumSubject1',
    comments: allComments,
  });
  const forumThread = forumThreadService.readById(0) as unknown as ModelDefined<
    ForumThreadAttributes,
    ForumThreadCreationAttributes
  >;

  await userService.bulkCreate([
    {
      backendId: 1,
      first_name: 'Name1',
      second_name: 'Surname1',
      login: 'testLogin1',
      email: 'email1@test.ru',
      phone: '1111111111',
      avatar: '/test1',
      current_theme: lightTheme,
      forum_threads: [forumThread],
      comments: [allComments[0], allComments[1]],
    },
    {
      backendId: 2,
      first_name: 'Name2',
      second_name: 'Surname2',
      login: 'testLogin2',
      email: 'email2@test.ru',
      phone: '222222222',
      avatar: '/test2',
      current_theme: darkTheme,
      comments: [allComments[2]],
    },
    {
      backendId: 3,
      first_name: 'Name3',
      second_name: 'Surname3',
      login: 'testLogin3',
      email: 'email3@test.ru',
      phone: '33333333333333',
      avatar: '/test3',
      current_theme: darkTheme,
    },
  ]);
}
