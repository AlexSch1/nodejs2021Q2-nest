import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { BoardEntity } from '../../boards/entities/board.entity';
import { ColumnEntity } from '../../boards/entities/column.entity';
import { MAX_TITLE_LENGTH, MAX_DESCRIPTION_LENGTH } from '../consts/task.const';
import { ITask } from '../interfaces/task.interface';

@Entity({ name: 'task' })
export class TaskEntity implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: MAX_TITLE_LENGTH })
  title: string;

  @Column('int')
  order: number;

  @Column('varchar', { length: MAX_DESCRIPTION_LENGTH })
  description: string;

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL' })
  @Column('uuid', { name: 'userIdId', nullable: true })
  userId: string | null;

  @ManyToOne(() => BoardEntity, { onDelete: 'CASCADE' })
  @Column('uuid', { name: 'boardIdId', nullable: true })
  boardId: string;

  @ManyToOne(() => ColumnEntity, { onDelete: 'CASCADE' })
  @Column('uuid', { name: 'columnIdId', nullable: true })
  columnId: string;

  static toResponse = (task?: Partial<ITask>): Partial<ITask> | undefined => task;
}
