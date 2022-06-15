import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/users/users.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './features/login/login.module';
import { ormConfig } from '../orm.config';
import { UsersService } from './features/users/users.service';
import { TasksModule } from './features/tasks/tasks.module';
import { BoardsModule } from './features/boards/boards.module';

const DEFAULT_USER = {
  name: 'admin',
  login: 'admin',
  password: 'admin',
};

@Module({
  imports: [
    UsersModule,
    SharedModule,
    LoginModule,
    TypeOrmModule.forRoot(ormConfig),
    TasksModule,
    BoardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private usersService: UsersService) {}

  async onModuleInit(): Promise<void> {
    if (!(await this.usersService.findByLogin(DEFAULT_USER.login))) {
      await this.usersService.create(DEFAULT_USER);
      console.log('Default user created');
    }
  }
}
