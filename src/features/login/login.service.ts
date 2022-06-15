import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { IEnv } from 'src/interfaces/env.interface';
import { HashService } from 'src/shared/services/hash.service';
import { IUsersService } from 'src/features/users/interfaces/user-service.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { IUser } from '../users/interfaces/user.interface';

@Injectable()
export class LoginService {
  constructor(
    @Inject('usersService') private usersService: IUsersService,
    private configService: ConfigService<IEnv>,
    private hashService: HashService,
  ) {}

  async getAuthToken({ login, password }: UserLoginDto): Promise<string> {
    try {
      const user: IUser = await this.usersService.findByLogin(login);
      if (!user) return '';
      const result: boolean = await this.hashService.checkHash(password, user.password);
      if (!result) return '';

      const key = String(this.configService.get<string>('JWT_KEY'));
      return jwt.sign({ userId: user.id, login }, key, {
        expiresIn: this.configService.get<string>('TOKEN_EXP'),
      });
    } catch (error) {
      return '';
    }
  }
}
