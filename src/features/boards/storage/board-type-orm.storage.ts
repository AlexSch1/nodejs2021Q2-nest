import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { BoardEntity } from '../entities/board.entity';
import { ColumnEntity } from '../entities/column.entity';

@Injectable()
export class BoardTypeOrmStorage {
  constructor(@InjectRepository(BoardEntity) private boardsRepository: Repository<BoardEntity>) {}

  async findAll(): Promise<BoardEntity[]> {
    return this.boardsRepository.find();
  }

  async findOne(id: string): Promise<BoardEntity | undefined> {
    return this.boardsRepository.findOne(id);
  }

  async create(createBoardDto: CreateBoardDto): Promise<BoardEntity> {
    const columns: ColumnEntity[] = createBoardDto.columns.map((column) =>
      Object.assign(new ColumnEntity(), column),
    );
    return this.boardsRepository.save(
      this.boardsRepository.create({ ...createBoardDto, columns }),
    );
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<BoardEntity | undefined> {
    const board = await this.findOne(id);
    if (!board) return;

    return this.boardsRepository.save({ ...board, ...updateBoardDto });
  }

  async remove(id: string): Promise<boolean> {
    return Boolean((await this.boardsRepository.delete(id)).affected);
  }
}
