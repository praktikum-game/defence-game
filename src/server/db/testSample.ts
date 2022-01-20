import { commentService, forumThreadService, siteThemeService, userService } from './services';

export async function addTestSamples() {
  const existedThemes = await siteThemeService.readAll();
  if (existedThemes.length !== 0) {
    // eslint-disable-next-line no-console
    console.log('Data exits. No need to add');
    return;
  }

  await siteThemeService.bulkCreate([{ theme: 'light' }, { theme: 'dark' }]);

  const lightTheme = await siteThemeService.readById(1);
  const darkTheme = await siteThemeService.readById(2);

  lightTheme?.createUser({ id: 123, name: 'pipa', siteThemeId: 1 });
  lightTheme?.createUser({ id: 234, name: 'pipa1', siteThemeId: 1 });

  try {
    const user = await userService.findByPraktikumId(123);
    await user?.createForumThread({ subject: 'Title', content: 'description', userId: 1235 });
  } catch (e: unknown) {
    const error = e as Error;
    console.log(error);
  }

  if (darkTheme && lightTheme) {
    await userService.bulkCreate([
      {
        id: 1233,
        name: 'TestUser1',
        avatar: null,
        siteThemeId: 1,
      },
      {
        id: 2,
        name: 'TestUser2',
        siteThemeId: 2,
      },
      {
        id: 3,
        name: 'TestUser3',
        siteThemeId: 1,
      },
    ]);
  }

  const user = await userService.readOne();
  if (user) {
    await forumThreadService.create({
      content: 'ForumContent1',
      subject: 'ForumSubject1',
      userId: user.id,
    });
  }
  const forumThread = await forumThreadService.readOne();

  if (user && forumThread) {
    await commentService.bulkCreate([
      {
        content: 'TestComment1',
        replyCommentId: null,
        userId: user.id,
        forumThreadId: forumThread.id,
      },
      {
        content: 'TestComment2',
        replyCommentId: null,
        userId: user.getDataValue('id'),
        forumThreadId: forumThread.id,
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

  console.log(await user?.getSiteTheme());
}
