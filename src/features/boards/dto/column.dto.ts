import { IsInt, Length, IsUUID } from 'class-validator';
import { MIN_TITLE_LENGTH, MAX_TITLE_LENGTH } from '../consts/board.const';
import { IColumnDto } from '../interfaces/column.interface';

export class ColumnDto implements IColumnDto {
  @IsUUID()
  id: string;

  @Length(MIN_TITLE_LENGTH, MAX_TITLE_LENGTH)
  title: string;

  @IsInt()
  order: number;

  @IsUUID()
  boardId: string;
}
