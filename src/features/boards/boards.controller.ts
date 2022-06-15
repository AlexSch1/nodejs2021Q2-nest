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
import { BoardsService } from './boards.service';
import { BoardDto } from './dto/board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardNotFoundException } from './exceptions/board-not-found.error';

@Controller('boards')
export class BoardsController {
  constructor(@Inject('BoardsService') private readonly boardsService: BoardsService) {}

  @Get()
  async findAll(): Promise<BoardDto[]> {
    return this.boardsService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBoardDto: CreateBoardDto): Promise<BoardDto> {
    const board: BoardDto = await this.boardsService.create(createBoardDto);
    if (!board) {
      throw new BadRequestException('Unable to create the board');
    }
    return board;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BoardDto> {
    const board: BoardDto = await this.boardsService.findOne(id);
    if (!board) {
      throw new BoardNotFoundException();
    }
    return board;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<BoardDto> {
    const board: BoardDto = await this.boardsService.update(id, updateBoardDto);
    if (!board) {
      throw new BadRequestException('Unable to update the board');
    }
    return board;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    if (!(await this.boardsService.remove(id))) {
      throw new BoardNotFoundException();
    }
  }
}
