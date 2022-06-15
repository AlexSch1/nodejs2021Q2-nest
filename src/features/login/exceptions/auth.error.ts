import { UnauthorizedException } from '@nestjs/common';

const UNAUTHORIZED_MESSAGE = 'Unauthorized access';

export class AuthException extends UnauthorizedException {
  constructor(message: string = UNAUTHORIZED_MESSAGE) {
    super(message);
  }
}
