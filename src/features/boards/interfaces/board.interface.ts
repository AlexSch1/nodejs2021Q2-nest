import { IEntity } from 'src/interfaces/types';
import { IColumn } from './column.interface';

export interface IBoard extends IEntity {
  title: string;
  columns: IColumn[];
}

export type IBoardDto = Omit<IBoard, 'id'>;
