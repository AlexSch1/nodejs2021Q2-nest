import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpExceptionLogger } from './exception-filters/logger-exception.filter';
import { FileLogger } from './services/file-logger.service';
import { HashService } from './services/hash.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [HashService, FileLogger, HttpExceptionLogger],
  exports: [ConfigModule, HashService, FileLogger, HttpExceptionLogger],
})
export class SharedModule {}
