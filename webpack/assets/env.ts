type AppEnv = 'development' | 'testing' | 'production';

export const ENV: AppEnv = (process.env.NODE_ENV as AppEnv) || 'development';

export const ENVS = {
  __DEV__: ENV === 'development',
  __PROD__: ENV === 'production',
  __TEST__: ENV === 'testing',
};
export const GLOBAL_ARGS = {
  // ...ENVS, // не пойму, зачем это здесь и зачем повторять
  'process.env': {
    ...ENVS,
    NODE_ENV: JSON.stringify(ENV),
    PORT: process.env.PORT || 4007,
  },
};
