import { Length } from 'class-validator';
import {
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MIN_LOGIN_LENGTH,
  MAX_LOGIN_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} from '../consts/user.const';
import { IUserDto } from '../interfaces/user.interface';

export class CreateUserDto implements IUserDto {
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH)
  name: string;

  @Length(MIN_LOGIN_LENGTH, MAX_LOGIN_LENGTH)
  login: string;

  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH)
  password: string;
}
