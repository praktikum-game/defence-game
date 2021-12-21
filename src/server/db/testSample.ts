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

  const lightTheme = await siteThemeService.readById(0);
  const darkTheme = await siteThemeService.readById(1);

  await commentService.bulkCreate([
    { content: 'TestComment1', reply_comment: null },
    { content: 'TestComment2', reply_comment: null },
  ]);
  const commentTest = await commentService.readById(0);

  await commentService.bulkCreate([{ content: 'TestComment3', reply_comment: commentTest }]);
  const allComments = await commentService.readAll();

  await forumThreadService.create({
    content: 'ForumContent1',
    subject: 'ForumSubject1',
    comments: allComments,
  });
  const forumThread = await forumThreadService.readById(0);

  await userService.bulkCreate([
    {
      praktikumId: 1,
      current_theme: lightTheme!,
      forum_threads: [forumThread!],
      comments: [allComments[0], allComments[1]],
    },
    {
      praktikumId: 2,
      current_theme: darkTheme!,
      comments: [allComments[2]],
    },
    {
      praktikumId: 3,
      current_theme: darkTheme!,
    },
  ]);
}
