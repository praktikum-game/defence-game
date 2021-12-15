import { Options } from 'sequelize';

export const sequelizeOptions: Options = {
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'game_db',
  dialect: 'postgres',
};
