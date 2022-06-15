import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskEntity } from '../entities/task.entity';

export interface ITaskStorage {
  create: (boardId: string, createTaskDto: CreateTaskDto) => Promise<TaskEntity>;
  findAll: (boardId: string) => Promise<TaskEntity[]>;
  findOne: (boardId: string, id: string) => Promise<TaskEntity>;
  update: (boardId: string, id: string, updateTaskDto: UpdateTaskDto) => Promise<TaskEntity>;
  remove: (boardId: string, id: string) => Promise<boolean>;
}
