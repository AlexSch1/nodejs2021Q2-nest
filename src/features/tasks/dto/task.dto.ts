import { IsInt, Length, IsOptional, IsUUID } from 'class-validator';
import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MAX_DESCRIPTION_LENGTH,
} from '../consts/task.const';
import { ITaskDto } from '../interfaces/task.interface';

export class TaskDto implements ITaskDto {
  @IsUUID()
  id: string;

  @Length(MIN_TITLE_LENGTH, MAX_TITLE_LENGTH)
  title: string;

  @IsInt()
  order: number;

  @Length(MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH)
  description: string;

  @IsOptional()
  @IsUUID()
  userId: string | null;

  @IsOptional()
  @IsUUID()
  boardId: string;

  @IsOptional()
  @IsUUID()
  columnId: string;
}
