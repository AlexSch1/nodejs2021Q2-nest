import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { IEnv } from 'src/interfaces/env.interface';

@Injectable()
export class HashService {
  constructor(private configService: ConfigService<IEnv>) {}

  async checkHash(text: string, hash: string): Promise<boolean> {
    return bcrypt.compare(text, hash);
  }

  get salt(): number {
    return Number(this.configService.get<number>('SALT'));
  }

  getHash(test: string): Promise<string> {
    return bcrypt.hash(test, this.salt);
  }

  getHashSync(test: string): string {
    return bcrypt.hashSync(test, this.salt);
  }
}
