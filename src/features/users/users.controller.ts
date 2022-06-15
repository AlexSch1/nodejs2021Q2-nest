import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserNotFoundException } from './exceptions/user-not-found.error';
import { IUsersService } from './interfaces/user-service.interface';

@Controller('users')
export class UsersController {
  constructor(@Inject('UsersService') private readonly usersService: IUsersService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.usersService.create(createUserDto);
    if (!user) {
      throw new BadRequestException('Unable to create user');
    }
    return user;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.usersService.update(id, updateUserDto);
    if (!user) {
      throw new BadRequestException('Unable to update user');
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    if (!(await this.usersService.remove(id))) {
      throw new UserNotFoundException();
    }
  }
}
