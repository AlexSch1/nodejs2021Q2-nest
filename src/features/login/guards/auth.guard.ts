import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { IEnv } from 'src/interfaces/env.interface';
import { AuthException } from '../exceptions/auth.error';
import { IAuthLogin } from '../interfaces/auth-login.interface';

const BEARER = 'Bearer ';
const UNAUTHORIZED_PATHS = ['/login', '/doc', '/'];

const isUnauthorizedPath = ({ url }: Request): boolean => UNAUTHORIZED_PATHS.includes(url);

const promisifyJWT = (token: string, secretOrPublicKey: string): Promise<IAuthLogin> =>
  new Promise((resolve, reject) => {
    const verifyCallback: jwt.VerifyCallback<IAuthLogin> = (
      err: jwt.VerifyErrors | null,
      data?: IAuthLogin,
    ): void => {
      if (err || !data) {
        reject(err);
      } else {
        resolve(data);
      }
    };

    jwt.verify(token, secretOrPublicKey, verifyCallback as jwt.VerifyCallback);
  });

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService<IEnv>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();

    if (request.method === 'OPTIONS' || isUnauthorizedPath(request)) {
      return true;
    }

    const sessionToken = request.headers.authorization;
    if (!sessionToken?.startsWith(BEARER)) {
      throw new AuthException('Bearer authorization scheme does not found');
    }

    try {
      const key = String(this.configService.get<string>('JWT_KEY'));
      const tokenPayload = sessionToken.substr(BEARER.length);
      const { userId, login } = await promisifyJWT(tokenPayload, key);
      if (!userId || !login) {
        throw new AuthException();
      }

      return true;
    } catch (error) {
      throw new AuthException(error.message);
    }
  }
}
