import { IEntity } from 'src/interfaces/types';

export interface ITask extends IEntity {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
}

export type ITaskDto = Omit<ITask, 'id'>;
