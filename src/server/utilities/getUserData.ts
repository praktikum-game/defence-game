import { authAPI } from 'api/auth';

export const getUserDataSsr = async (cookie: string | undefined) => {
  if (!cookie) {
    throw new Error('No cookie');
  }
  const { status, data } = await authAPI.userRead({
    headers: {
      Cookie: cookie,
    },
  });

  return { status, data };
};
