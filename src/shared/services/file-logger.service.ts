/* eslint-disable no-console */
import { Injectable, Scope, Logger } from '@nestjs/common';
import { appendFile, existsSync, mkdirSync, createWriteStream, WriteStream } from 'fs';

const UNCAUGHT_EXCEPTION_EXIT = 1;
const UNHANDLED_REJECTION_EXIT = 2;

@Injectable({ scope: Scope.TRANSIENT })
export class FileLogger extends Logger {
  static cashedLogFolder: string;

  static errorToText(error: Error): string {
    return error.stack ?? String(error.message ? error.message : error);
  }

  static createStream(logLevel = 'general'): WriteStream {
    const logFolder: string = FileLogger.cashedLogFolder;
    const fileName = `${logFolder}/${logLevel}.txt`;
    if (!existsSync(logFolder)) {
      mkdirSync(logFolder);
    }
    return createWriteStream(fileName, { flags: 'a' });
  }

  static logToFile(message: string, logLevel = 'general'): Promise<void> {
    const logFolder: string = FileLogger.cashedLogFolder;
    const fileName = `${logFolder}/${logLevel}.txt`;
    const preparedMessage = `${new Date().toISOString()}: ${message}\n\n`;

    return new Promise((resolve: () => void) => {
      if (!existsSync(logFolder)) {
        mkdirSync(logFolder);
      }

      appendFile(fileName, preparedMessage, (error): void => {
        if (error) {
          console.error(
            `Fail save log [${preparedMessage}] to file [${logLevel}] with reason: ${error}`,
          );
        }
        resolve();
      });
    });
  }

  log(message: string, logLevel = 'general'): Promise<void> {
    return FileLogger.logToFile(message, logLevel);
  }

  error(message: string, trace: string): Promise<void> {
    return FileLogger.logToFile(message, trace);
  }

  warn(message: string): Promise<void> {
    return FileLogger.logToFile(message);
  }
}

export const exceptionHandler = (error: Error, origin: string): void => {
  const message = `${origin}: ${FileLogger.errorToText(error)}`;

  console.error(message);
  FileLogger.logToFile(message, 'error').finally(() => process.exit(UNCAUGHT_EXCEPTION_EXIT));
};

export const promiseErrorHandler = (reason: Error): void => {
  const message = `Unhandled Rejection with reason: ${FileLogger.errorToText(reason)}`;

  console.error(message);
  FileLogger.logToFile(message, 'error').finally(() => process.exit(UNHANDLED_REJECTION_EXIT));
};
