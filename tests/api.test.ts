import { app } from '../index'
import supertest from 'supertest';

describe('GET /api/ping', () => {
  test('/api/ping returns "pong"', async () => {
    const response = await supertest(app).get('/api/ping');

    expect(response.text).toBe('pong');
    expect(response.status).toBe(200);
  })
})
