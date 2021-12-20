import { Options } from 'sequelize';
import pg from 'pg';
import { config } from 'dotenv';

config();

const { POSTGRES_ORM_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } =
  process.env;

export const sequelizeOptions: Options = {
  host: POSTGRES_ORM_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  dialectModule: pg,
};
