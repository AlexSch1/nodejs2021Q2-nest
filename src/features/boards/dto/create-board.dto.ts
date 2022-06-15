import { Length, IsArray } from 'class-validator';
import { MIN_TITLE_LENGTH, MAX_TITLE_LENGTH } from '../consts/board.const';
import { IBoardDto } from '../interfaces/board.interface';
import { IColumn } from '../interfaces/column.interface';

export class CreateBoardDto implements IBoardDto {
  @Length(MIN_TITLE_LENGTH, MAX_TITLE_LENGTH)
  title: string;

  @IsArray()
  columns: IColumn[];
}
