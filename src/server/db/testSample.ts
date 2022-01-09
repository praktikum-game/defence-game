// import { SiteTheme } from './models/SiteTheme';
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

  const lightTheme = await siteThemeService.readById(1);
  const darkTheme = await siteThemeService.readById(2);

  if (darkTheme && lightTheme) {
    console.log('---------------lightTheme exists-------------');
    console.log('theme', darkTheme.toJSON());
    const res = await userService.bulkCreate([
      {
        praktikumId: 1,
        siteThemeId: lightTheme.getDataValue('id'),
      },
      {
        praktikumId: 2,
        siteThemeId: darkTheme.getDataValue('id'),
      },
      {
        praktikumId: 3,
        siteThemeId: darkTheme.getDataValue('id'),
      },
    ]);

    console.log(
      'creating models',
      res.map((r) => r.toJSON()),
    );
  }

  const user = await userService.readOne();
  if (user) {
    const forumThread = await forumThreadService.create({
      content: 'ForumContent1',
      subject: 'ForumSubject1',
      userId: user.getDataValue('id'),
    });

    console.log('forumThread: ', forumThread.toJSON());
  }
  const forumThread = await forumThreadService.readOne();

  if (user && forumThread) {
    const comments = await commentService.bulkCreate([
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
    console.log(
      'comments: ',
      comments.map((c) => c.toJSON()),
    );
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
