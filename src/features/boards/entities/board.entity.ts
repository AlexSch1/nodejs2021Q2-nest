import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TaskEntity } from '../../tasks/entities/task.entity';
import { MAX_TITLE_LENGTH } from '../consts/board.const';
import { IBoard } from '../interfaces/board.interface';
import { ColumnEntity } from './column.entity';

@Entity({ name: 'board' })
export class BoardEntity implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: MAX_TITLE_LENGTH })
  title: string;

  @OneToMany<ColumnEntity>(() => ColumnEntity, (column: ColumnEntity): string => column.boardId, {
    cascade: true,
    eager: true,
  })
  columns: ColumnEntity[];

  @OneToMany<TaskEntity>(() => TaskEntity, (task: TaskEntity): string => task.boardId, {
    cascade: true,
  })
  tasks: TaskEntity[];

  static toResponse(board?: Partial<IBoard>): Partial<IBoard> | undefined {
    return board;
  }
}
