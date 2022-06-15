import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TaskEntity } from '../../tasks/entities/task.entity';
import {
  MAX_NAME_LENGTH,
  MAX_LOGIN_LENGTH,
  MAX_HASHED_PASSWORD_LENGTH,
} from '../consts/user.const';
import { UserDto } from '../dto/user.dto';
import { IUser } from '../interfaces/user.interface';

@Entity({ name: 'user' })
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: MAX_NAME_LENGTH })
  name: string;

  @Column('varchar', { length: MAX_LOGIN_LENGTH })
  login: string;

  @Column('varchar', { length: MAX_HASHED_PASSWORD_LENGTH })
  password: string;

  @OneToMany<TaskEntity>(() => TaskEntity, (task: TaskEntity): string => task.userId as string, {
    cascade: true,
  })
  tasks?: TaskEntity[];

  static toResponse(user?: IUser): UserDto | undefined {
    if (!user) return undefined;

    const { id, name, login } = user;
    return { id, name, login };
  }
}
