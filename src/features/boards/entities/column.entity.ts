import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { TaskEntity } from '../../tasks/entities/task.entity';
import { MAX_TITLE_LENGTH } from '../consts/board.const';
import { IColumn } from '../interfaces/column.interface';
import { BoardEntity } from './board.entity';

@Entity({ name: 'column' })
export class ColumnEntity implements IColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => BoardEntity, (board) => board.columns, { onDelete: 'CASCADE' })
  boardId: string;

  @Column('varchar', { length: MAX_TITLE_LENGTH })
  title: string;

  @Column('int')
  order: number;

  @OneToMany<TaskEntity>(() => TaskEntity, (task: TaskEntity): string => task.columnId, {
    cascade: true,
  })
  tasks: TaskEntity[];

  static toResponse = (column?: Partial<IColumn>): Partial<IColumn> | undefined => column;
}
