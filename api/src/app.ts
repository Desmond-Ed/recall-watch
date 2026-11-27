import express, { type Express } from 'express';
import type { Logger } from 'pino';
import { pinoHttp } from 'pino-http';
import { createErrorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { healthRouter } from './routes/health.js';

export interface AppDeps {
  logger: Logger;
}

export function createApp({ logger }: AppDeps): Express {
  const app = express();

  app.use(
    pinoHttp({
      logger,
      serializers: {
        req: (req) => ({ method: req.method, path: req.url }),
        res: (res) => ({ statusCode: res.statusCode }),
      },
    }),
  );

  app.use('/health', healthRouter);
  app.use(notFoundHandler);
  app.use(createErrorHandler(logger));

  return app;
}
