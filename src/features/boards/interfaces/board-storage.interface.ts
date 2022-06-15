import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { BoardEntity } from '../entities/board.entity';

export interface IBoardStorage {
  create: (createBoardDto: CreateBoardDto) => Promise<BoardEntity>;
  findAll: () => Promise<BoardEntity[]>;
  findOne: (id: string) => Promise<BoardEntity>;
  update: (id: string, updateBoardDto: UpdateBoardDto) => Promise<BoardEntity>;
  remove: (id: string) => Promise<boolean>;
}
