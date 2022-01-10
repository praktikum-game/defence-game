import { commentService, forumThreadService, siteThemeService, userService } from './services';

export async function addTestSamples() {
  // Чтобы сильно не заморачиваться с дублирующимися данными, просто делаю такую
  // проверку
  const existedThemes = await siteThemeService.readAll();
  if (existedThemes.length !== 0) {
    // eslint-disable-next-line no-console
    console.log('Data exits. No need to add');
    return;
  }

  await siteThemeService.bulkCreate([{ theme: 'light' }, { theme: 'dark' }]);

  const lightTheme = await siteThemeService.readById(1);
  const darkTheme = await siteThemeService.readById(2);

  if (darkTheme && lightTheme) {
    await userService.bulkCreate([
      {
        id: 123,
        siteThemeId: lightTheme.getDataValue('id'),
        name: 'TestUser1',
        avatar: null,
      },
      {
        id: 2,
        siteThemeId: darkTheme.getDataValue('id'),
        name: 'TestUser2',
      },
      {
        id: 3,
        siteThemeId: darkTheme.getDataValue('id'),
        name: 'TestUser3',
      },
    ]);
  }

  const user = await userService.readOne();
  if (user) {
    await forumThreadService.create({
      content: 'ForumContent1',
      subject: 'ForumSubject1',
      userId: user.getDataValue('id'),
    });
  }
  const forumThread = await forumThreadService.readOne();

  if (user && forumThread) {
    await commentService.bulkCreate([
      {
        content: 'TestComment1',
        replyCommentId: null,
        userId: user.getDataValue('id'),
        forumThreadId: forumThread.getDataValue('id'),
      },
      {
        content: 'TestComment2',
        replyCommentId: null,
        userId: user.getDataValue('id'),
        forumThreadId: forumThread.getDataValue('id'),
      },
    ]);
  }

  const commentTest = await commentService.readOne();
  if (commentTest && user && forumThread) {
    await commentService.bulkCreate([
      {
        content: 'TestComment3',
        replyCommentId: commentTest.getDataValue('id'),
        userId: user.getDataValue('id'),
        forumThreadId: forumThread.getDataValue('id'),
      },
    ]);
  }
}
