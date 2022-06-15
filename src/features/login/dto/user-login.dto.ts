import { IsNotEmpty } from 'class-validator';
import { IUserLogin } from '../interfaces/user-login.interface';

export class UserLoginDto implements IUserLogin {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
