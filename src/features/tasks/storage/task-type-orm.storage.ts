import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskEntity } from '../entities/task.entity';

@Injectable()
export class TaskTypeOrmStorage {
  constructor(@InjectRepository(TaskEntity) private tasksRepository: Repository<TaskEntity>) {}

  async findAll(boardId: string): Promise<TaskEntity[]> {
    return this.tasksRepository.find({ boardId });
  }

  async findOne(boardId: string, id: string): Promise<TaskEntity | undefined> {
    return this.tasksRepository.findOne({ boardId, id });
  }

  async create(boardId: string, createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksRepository.save(this.tasksRepository.create({ ...createTaskDto, boardId }));
  }

  async update(
    boardId: string,
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskEntity | undefined> {
    const task: TaskEntity | undefined = await this.findOne(boardId, id);
    if (!task) return;

    return this.tasksRepository.save({ ...task, ...updateTaskDto });
  }

  async remove(boardId: string, id: string): Promise<boolean> {
    return Boolean((await this.tasksRepository.delete({ boardId, id })).affected);
  }
}
