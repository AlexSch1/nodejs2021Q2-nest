import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';
import { FileLogger } from '../services/file-logger.service';

@Catch(HttpException)
export class HttpExceptionLogger implements ExceptionFilter {
  constructor(private fileLogger: FileLogger) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();
    const exceptionStatus: number = exception.getStatus();
    const { message, stack } = exception;

    const { statusCode } = response;
    const { url, method, body } = request;

    const bodyString = JSON.stringify(body);

    const text = `Received request: [${method}] for [${url}]; 'body'= ${bodyString}. Response 'statusCode'= ${statusCode}; Exception: ${exceptionStatus}, ${message}, ${stack}`;
    this.fileLogger.log(text, 'error');

    response.status(exceptionStatus).send({
      statusCode,
      error: exception.message,
    });
  }
}
