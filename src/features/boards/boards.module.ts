import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { BoardEntity } from './entities/board.entity';
import { BoardTypeOrmStorage } from './storage/board-type-orm.storage';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([BoardEntity])],
  controllers: [BoardsController],
  providers: [
    {
      provide: 'BoardsService',
      useClass: BoardsService,
    },
    {
      provide: 'BoardStorage',
      useClass: BoardTypeOrmStorage,
    },
    BoardsService,
    BoardTypeOrmStorage,
  ],
})
export class BoardsModule {}
