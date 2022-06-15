import { IEntity } from 'src/interfaces/types';

export interface IUser extends IEntity {
  name: string;
  login: string;
  password: string;
}

export type IUserDto = Omit<IUser, 'id'>;
