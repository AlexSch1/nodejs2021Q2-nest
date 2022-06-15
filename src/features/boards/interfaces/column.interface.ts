import { IEntity } from 'src/interfaces/types';

export interface IColumn extends IEntity {
  title: string;
  order: number;
  boardId: string;
}

export type IColumnDto = Omit<IColumn, 'id'>;
