import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './entities/user.entity';
import { UserTypeOrmStorage } from './storage/user-type-orm.storage';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    {
      provide: 'UsersService',
      useClass: UsersService,
    },
    {
      provide: 'UserStorage',
      useClass: UserTypeOrmStorage,
    },
    UsersService,
    UserTypeOrmStorage,
  ],
  exports: [UsersService, UserTypeOrmStorage],
})
export class UsersModule {}
