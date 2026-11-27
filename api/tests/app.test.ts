import request from 'supertest';
import { pino } from 'pino';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';

const app = createApp({ logger: pino({ level: 'silent' }) });

describe('GET /health', () => {
  it('returns 200 with status, uptimeSeconds and an ISO time', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: 'ok',
      uptimeSeconds: expect.any(Number),
      time: expect.any(String),
    });
    expect(new Date(res.body.time).toISOString()).toBe(res.body.time);
  });
});

describe('unknown routes', () => {
  it('return 404 with the standard error shape', async () => {
    const res = await request(app).get('/does-not-exist');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      error: { code: 'NOT_FOUND', message: expect.any(String) },
    });
  });
});
