import { Inject, Injectable } from '@nestjs/common';
import { BoardDto } from './dto/board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { IBoardsService } from './interfaces/board-service.interface';
import { IBoardStorage } from './interfaces/board-storage.interface';

@Injectable()
export class BoardsService implements IBoardsService {
  constructor(@Inject('BoardStorage') private boardStorage: IBoardStorage) {}

  async create(createBoardDto: CreateBoardDto): Promise<BoardDto> {
    return this.boardStorage.create(createBoardDto);
  }

  async findAll(): Promise<BoardDto[]> {
    return this.boardStorage.findAll();
  }

  async findOne(id: string): Promise<BoardDto> {
    return this.boardStorage.findOne(id);
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<BoardDto> {
    return this.boardStorage.update(id, updateBoardDto);
  }

  async remove(id: string): Promise<boolean> {
    return this.boardStorage.remove(id);
  }
}
