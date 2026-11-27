import express from 'express';
import request from 'supertest';
import { pino } from 'pino';
import { describe, expect, it } from 'vitest';
import { createErrorHandler } from '../src/middleware/errorHandler.js';

describe('error handler', () => {
  it('returns a generic 500 and does not leak the original error message', async () => {
    const app = express();
    app.get('/boom', () => {
      throw new Error('secret-detail');
    });
    app.use(createErrorHandler(pino({ level: 'silent' })));

    const res = await request(app).get('/boom');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' },
    });
    expect(JSON.stringify(res.body)).not.toContain('secret-detail');
  });
});
