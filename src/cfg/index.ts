import * as dotenv from 'dotenv-safe';
import { IConfig } from '@interfaces/IConfig';

const envFound = dotenv.config();

if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config: IConfig = {
  appname: 'Blue App',
  baseurl: process.env.BASEURL || 'http://localhost',
  env: process.env.NODE_ENV || 'development',
  api: {
    prefix: '/api',
    port: process.env.PORT || 3000,
    jwt: {
      secret: 'secret', // update before deployment
      expiresInHours: 24, // 24 hrs, update before deployment
    },
    bcrypt: {
      rounds: 8,
    },
  },
  db: {
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_DATABASE}`,
    port: process.env.DB_PORT || 3306,
  },
  logs: {
    level: process.env.LOG_LEVEL || 'debug',
    logRequestsEnabled: true,
    file: 'debug.log',
  },
  interceptors: [],
};

export default {
  ...config,
  ...require(`./${config.env}`).default,
};
