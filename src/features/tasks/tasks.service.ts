import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITasksService } from './interfaces/task-service.interface';
import { ITaskStorage } from './interfaces/task-storage.interface';

@Injectable()
export class TasksService implements ITasksService {
  constructor(@Inject('TaskStorage') private taskStorage: ITaskStorage) {}

  async create(boardId: string, createTaskDto: CreateTaskDto): Promise<TaskDto> {
    return this.taskStorage.create(boardId, createTaskDto);
  }

  async findAll(boardId: string): Promise<TaskDto[]> {
    return this.taskStorage.findAll(boardId);
  }

  async findOne(boardId: string, id: string): Promise<TaskDto> {
    return this.taskStorage.findOne(boardId, id);
  }

  async update(boardId: string, id: string, updateTaskDto: UpdateTaskDto): Promise<TaskDto> {
    return this.taskStorage.update(boardId, id, updateTaskDto);
  }

  async remove(boardId: string, id: string): Promise<boolean> {
    return this.taskStorage.remove(boardId, id);
  }
}
