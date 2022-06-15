import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskNotFoundException } from './exceptions/task-not-found.error';
import { TaskDto } from './dto/task.dto';

@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(@Inject('TasksService') private readonly tasksService: TasksService) {}

  @Get()
  async findAll(@Param('boardId') boardId: string): Promise<TaskDto[]> {
    return this.tasksService.findAll(boardId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskDto> {
    const task = await this.tasksService.create(boardId, createTaskDto);
    if (!task) {
      throw new BadRequestException('Unable to create the task');
    }
    return task;
  }

  @Get(':id')
  async findOne(@Param('boardId') boardId: string, @Param('id') id: string): Promise<TaskDto> {
    const task = await this.tasksService.findOne(boardId, id);
    if (!task) {
      throw new TaskNotFoundException();
    }
    return task;
  }

  @Put(':id')
  async update(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDto> {
    const task = await this.tasksService.update(boardId, id, updateTaskDto);
    if (!task) {
      throw new BadRequestException('Unable to update the task');
    }
    return task;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('boardId') boardId: string, @Param('id') id: string): Promise<void> {
    if (!(await this.tasksService.remove(boardId, id))) {
      throw new TaskNotFoundException();
    }
  }
}
