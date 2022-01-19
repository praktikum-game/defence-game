import { Model } from 'sequelize/types';
import { SiteTheme, SiteThemeAttributes, SiteThemeCreationAttributes } from './models/SiteTheme';
import { User } from './models/User';
import { siteThemeService } from './services';

export async function addTestSamples() {
  // нормуль
  const theme: SiteTheme | null = await SiteTheme.findByPk(1);
  const users: User[] | undefined = await theme?.getUsers();
  console.log(users, theme?.id);

  // сервис возвращает уже другой тип (обобщенный) у которого нет нужных методов
  const theme1: Model<SiteThemeAttributes, SiteThemeCreationAttributes> | null =
    await siteThemeService.readById(1);

  const users1 = theme1?.getUser.... // нету

  console.log(theme1?.i)



  // const existedThemes = await siteThemeService.readAll();
  // if (existedThemes.length !== 0) {
  //   // eslint-disable-next-line no-console
  //   console.log('Data exits. No need to add');
  //   return;
  // }

  // const theme = await SiteTheme.getUsers()

  // await siteThemeService.bulkCreate([{ theme: 'light' }, { theme: 'dark' }]);

  // const lightTheme = await siteThemeService.readById(1)
  // const darkTheme = await siteThemeService.readById(2);

  // try {
  //   const user = await userService.readById(1)
  //   user.add
  //   await lightTheme?.createUser({ name: 'hoho', id: 1235, siteThemeId: 1, avatar: null });
  //   SiteTheme.bul
  // } catch (e: unknown) {
  //   const error = e as Error;
  //   console.log(error);
  // }

  // try {
  //   const user = await User.findByPk(1235);
  //   await user?.createForumThread({ subject: 'Title', content: 'description', userId: 1235 });
  // } catch (e: unknown) {
  //   const error = e as Error;
  //   console.log(error);
  // }

  // if (darkTheme && lightTheme) {
  //   await userService.bulkCreate([
  //     {
  //       id: 123,
  //       name: 'TestUser1',
  //       avatar: null,
  //       SiteThemeId: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'TestUser2',
  //       SiteThemeId: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'TestUser3',
  //       SiteThemeId: 1,
  //     },
  //   ]);
  // }

  // const user = await userService.readOne();
  // if (user) {
  //   await forumThreadService.create({
  //     content: 'ForumContent1',
  //     subject: 'ForumSubject1',
  //     UserId: user.getDataValue('id'),
  //   });
  // }
  // const forumThread = await forumThreadService.readOne();

  // if (user && forumThread) {
  //   await commentService.bulkCreate([
  //     {
  //       content: 'TestComment1',
  //       replyCommentId: null,
  //       userId: user.getDataValue('id'),
  //       forumThreadId: forumThread.getDataValue('id'),
  //     },
  //     {
  //       content: 'TestComment2',
  //       replyCommentId: null,
  //       userId: user.getDataValue('id'),
  //       forumThreadId: forumThread.getDataValue('id'),
  //     },
  //   ]);
  // }

  // const commentTest = await commentService.readOne();
  // if (commentTest && user && forumThread) {
  //   await commentService.bulkCreate([
  //     {
  //       content: 'TestComment3',
  //       replyCommentId: commentTest.getDataValue('id'),
  //       userId: user.getDataValue('id'),
  //       forumThreadId: forumThread.getDataValue('id'),
  //     },
  //   ]);
  // }
}
