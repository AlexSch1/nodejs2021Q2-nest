import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IEnv } from './interfaces/env.interface';
import { AuthGuard } from './features/login/guards/auth.guard';
import { HttpExceptionLogger } from './shared/exception-filters/logger-exception.filter';
import {
  exceptionHandler,
  FileLogger,
  promiseErrorHandler,
} from './shared/services/file-logger.service';
import { AppModule } from './app.module';
import { getFastifyInstance, installMorganLogger } from './main.helpes';

process.on('uncaughtException', exceptionHandler);
process.on('unhandledRejection', promiseErrorHandler);

async function bootstrap() {
  const isFastify = process.env['USE_FASTIFY'] === 'true';
  console.log(`${isFastify ? 'Fastify' : 'Express'} HTTP adapter applied`);

  const app: INestApplication = isFastify
    ? await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(getFastifyInstance(FileLogger.logToFile)),
      )
    : await NestFactory.create<NestExpressApplication>(AppModule);

  const config: ConfigService<IEnv> = app.get<ConfigService<IEnv>>('ConfigService');
  const port = Number(config.get<number>('PORT'));
  FileLogger.cashedLogFolder = String(config.get<string>('LOG_FOLDER'));

  if (!isFastify) installMorganLogger(app, FileLogger.createStream());

  app.useLogger(await app.resolve(FileLogger));

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionLogger(new FileLogger()));
  app.useGlobalGuards(new AuthGuard(config));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Rest API')
    .setDescription('Rest API application')
    .setVersion('1.0')
    .addTag('Desk')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`App is running on http://localhost:${port}`);
}
bootstrap();
