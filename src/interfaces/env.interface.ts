type iDbType = 'mysql' | 'postgres' | 'mssql' | 'oracle' | 'mongodb';

export interface IEnv {
  PORT: number;
  JWT_KEY: string;
  TOKEN_EXP: number | string;
  SALT: number;
  LOG_FOLDER: string;

  DB_TYPE: iDbType;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}
