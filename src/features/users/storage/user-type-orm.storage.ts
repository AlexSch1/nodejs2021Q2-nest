import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from 'src/shared/services/hash.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserTypeOrmStorage {
  constructor(
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
    private hashService: HashService,
  ) {}

  private prepareUser = async (user: UserEntity): Promise<UserEntity> => ({
    ...user,
    password: await this.hashService.getHash(user.password),
  });

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<UserEntity | undefined> {
    return this.usersRepository.findOne(id);
  }

  async findByLogin(login: string): Promise<UserEntity | undefined> {
    return this.usersRepository.findOne({ login });
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersRepository.save(
      await this.prepareUser(this.usersRepository.create(createUserDto)),
    );
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity | undefined> {
    const user: UserEntity | undefined = await this.findOne(id);
    if (!user) return;

    return this.usersRepository.save(await this.prepareUser({ ...user, ...updateUserDto }));
  }

  async remove(id: string): Promise<boolean> {
    return Boolean((await this.usersRepository.delete(id)).affected);
  }
}
