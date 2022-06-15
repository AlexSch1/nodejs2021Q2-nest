import { INestApplication } from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'http';
import * as morgan from 'morgan';
import { Request } from 'express';
import fastify, { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';

const EMPTY_FN = () => '';

export const installMorganLogger = (app: INestApplication, stream: morgan.StreamOptions) => {
  morgan.token('body', (req: Request) => JSON.stringify(req.body || {}));
  morgan.token('params', (req: Request) => JSON.stringify(req.params));
  morgan.token('query', (req: Request) => JSON.stringify(req.query));
  app.use(
    morgan(
      (tokens: morgan.TokenIndexer = {}, req: IncomingMessage, res: ServerResponse) => {
        const {
          method = EMPTY_FN,
          url = EMPTY_FN,
          body = EMPTY_FN,
          params = EMPTY_FN,
          query = EMPTY_FN,
          status = EMPTY_FN,
        } = tokens;
        return [
          method(req, res),
          url(req, res),
          'body: ',
          body(req, res),
          'params: ',
          params(req, res),
          'query: ',
          query(req, res),
          '. Response status code: ',
          status(req, res),
        ].join(' ');
      },
      {
        stream,
      },
    ),
  );
};

type LogFn = (message: string) => void;
export const getFastifyInstance = (log: LogFn) => {
  const fastifyInstance = fastify({ logger: true });

  fastifyInstance.addHook(
    'preHandler',
    (req: FastifyRequest, res: FastifyReply, done: HookHandlerDoneFunction) => {
      const body = JSON.stringify(req.body || {});
      const params = JSON.stringify(req.params);
      const query = JSON.stringify(req.query);
      const message = `Request: ${req.method} ${req.url}; body: ${body}, ${params}, ${query}, response status code: ${res.statusCode}`;
      log(message);
      done();
    },
  );
  return fastifyInstance;
};
