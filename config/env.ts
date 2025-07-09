import * as dotenv from 'dotenv';
dotenv.config();

export const envs = {
  SERVER_DOMAIN: process.env.SERVER_DOMAIN ?? 'http://localhost:3001',
  PORT: process.env.PORT ?? 3000,
  HOST_DB: process.env.HOST_DB,
  PORT_DB: process.env.PORT_DB,
  USERNAME_DB: process.env.USERNAME_DB,
  PASSWORD_DB: process.env.PASSWORD_DB,
  DATABASE_DB: process.env.DATABASE_DB,
};
