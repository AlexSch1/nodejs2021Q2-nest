import { Module } from '@nestjs/common';
import { UsersService } from 'src/features/users/users.service';
import { UsersModule } from 'src/features/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from 'src/shared/shared.module';
import { UserTypeOrmStorage } from 'src/features/users/storage/user-type-orm.storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/features/users/entities/user.entity';
import { AuthGuard } from './guards/auth.guard';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [SharedModule, ConfigModule, TypeOrmModule.forFeature([UserEntity]), UsersModule],
  controllers: [LoginController],
  providers: [
    LoginService,
    AuthGuard,
    {
      provide: 'usersService',
      useClass: UsersService,
    },
    {
      provide: 'UserStorage',
      useClass: UserTypeOrmStorage,
    },
  ],
  exports: [AuthGuard],
})
export class LoginModule {}
