import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { IUser } from './user.interface';

export interface IUsersService {
  create: (createUserDto: CreateUserDto) => Promise<UserDto | undefined>;
  findAll: () => Promise<UserDto[]>;
  findOne: (id: string) => Promise<UserDto>;
  findByLogin: (login: string) => Promise<IUser>;
  update: (id: string, updateUserDto: UpdateUserDto) => Promise<UserDto>;
  remove: (id: string) => Promise<boolean>;
}
