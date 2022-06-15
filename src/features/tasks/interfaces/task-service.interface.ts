import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskDto } from '../dto/task.dto';

export interface ITasksService {
  create: (boardId: string, createTaskDto: CreateTaskDto) => Promise<TaskDto>;
  findAll: (boardId: string) => Promise<TaskDto[]>;
  findOne: (boardId: string, id: string) => Promise<TaskDto>;
  update: (boardId: string, id: string, updateTaskDto: UpdateTaskDto) => Promise<TaskDto>;
  remove: (boardId: string, id: string) => Promise<boolean>;
}
