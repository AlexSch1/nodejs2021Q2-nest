import { join } from 'path';
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
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migration', '*.{ts,js}')],
  cli: {
    migrationsDir: join(__dirname, 'migration'),
  },
  migrationsRun: true,
};

export default ormConfig;
