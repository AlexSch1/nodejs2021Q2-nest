import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserStorage {
  create: (createUserDto: CreateUserDto) => Promise<UserEntity>;
  findAll: () => Promise<UserEntity[]>;
  findOne: (id: string) => Promise<UserEntity>;
  findByLogin: (login: string) => Promise<UserEntity>;
  update: (id: string, updateUserDto: UpdateUserDto) => Promise<UserEntity>;
  remove: (id: string) => Promise<boolean>;
}
