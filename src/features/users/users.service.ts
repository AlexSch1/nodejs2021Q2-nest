import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { IUsersService } from './interfaces/user-service.interface';
import { IUserStorage } from './interfaces/user-storage.interface';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(@Inject('UserStorage') private userStorage: IUserStorage) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    return UserEntity.toResponse(await this.userStorage.create(createUserDto)) as UserDto;
  }

  async findAll(): Promise<UserDto[]> {
    return this.userStorage.findAll();
  }

  async findOne(id: string): Promise<UserDto> {
    return this.userStorage.findOne(id);
  }

  async findByLogin(login: string): Promise<IUser> {
    return this.userStorage.findByLogin(login);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    return this.userStorage.update(id, updateUserDto);
  }

  async remove(id: string): Promise<boolean> {
    return this.userStorage.remove(id);
  }
}
