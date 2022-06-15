import { Body, Controller, ForbiddenException, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() userLoginDto: UserLoginDto): Promise<{ token: string }> {
    const token: string = await this.loginService.getAuthToken(userLoginDto);
    if (!token) throw new ForbiddenException();

    return { token };
  }
}
