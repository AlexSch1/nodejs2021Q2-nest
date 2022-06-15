import { Length, IsUUID } from 'class-validator';
import {
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MIN_LOGIN_LENGTH,
  MAX_LOGIN_LENGTH,
} from '../consts/user.const';
import { IUser } from '../interfaces/user.interface';

export class UserDto implements Partial<IUser> {
  @IsUUID()
  id: string;

  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH)
  name: string;

  @Length(MIN_LOGIN_LENGTH, MAX_LOGIN_LENGTH)
  login: string;
}
