import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskEntity } from './entities/task.entity';
import { TaskTypeOrmStorage } from './storage/task-type-orm.storage';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TasksController],
  providers: [
    {
      provide: 'TasksService',
      useClass: TasksService,
    },
    {
      provide: 'TaskStorage',
      useClass: TaskTypeOrmStorage,
    },
    TasksService,
    TaskTypeOrmStorage,
  ],
})
export class TasksModule {}
