import type { ErrorRequestHandler, RequestHandler } from 'express';
import type { Logger } from 'pino';
import { AppError } from '../errors.js';

export const notFoundHandler: RequestHandler = (_req, _res, next) => {
  next(new AppError(404, 'NOT_FOUND', 'Route not found'));
};

export function createErrorHandler(logger: Logger): ErrorRequestHandler {
  return (err, _req, res, next) => {
    if (res.headersSent) {
      next(err);
      return;
    }

    if (err instanceof AppError) {
      res.status(err.status).json({ error: { code: err.code, message: err.message } });
      return;
    }

    logger.error({ err }, 'unhandled error');
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } });
  };
}
