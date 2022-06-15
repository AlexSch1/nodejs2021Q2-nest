import { ConnectionOptions } from 'typeorm';
import { IEnv } from './src/interfaces/env.interface';

const { DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

declare const process: {
  env: IEnv;
};
export const ormConfig: ConnectionOptions = {
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: ['./src/**/*.entity.js', './src/**/*.entity.ts'],
  migrations: ['./src/migration/*.js', './src/migration/*.ts'],
  cli: {
    migrationsDir: './src/migration',
  },
  migrationsRun: true,
};

export default ormConfig;
