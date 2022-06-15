import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { BoardDto } from '../dto/board.dto';

export interface IBoardsService {
  create: (createBoardDto: CreateBoardDto) => Promise<BoardDto>;
  findAll: () => Promise<BoardDto[]>;
  findOne: (id: string) => Promise<BoardDto>;
  update: (id: string, updateBoardDto: UpdateBoardDto) => Promise<BoardDto>;
  remove: (id: string) => Promise<boolean>;
}
