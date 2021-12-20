import { Sequelize } from 'sequelize';
import { SequelizeConfigs } from './config';

const env: keyof typeof SequelizeConfigs =
  (process.env.NODE_ENV as 'development' | 'test' | 'production') || 'development';

const config = SequelizeConfigs[env];

export const sequelize = new Sequelize(config.database!, config.username!, config.password, config);
