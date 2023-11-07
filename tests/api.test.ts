import { app } from '../index'
import supertest from 'supertest';

describe('GET /api/ping', () => {
  test('/api/ping returns "pong"', async () => {
    const response = await supertest(app).get('/api/ping');

    expect(response.text).toBe('pong');
    expect(response.status).toBe(200);
  })
})

describe('GET /api/diaries', () => {
  test('/api/diaries returns 200 and nonempty json', async () => {
    const response = await supertest(app).get('/api/diaries');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body.length).toBeGreaterThan(0)
  })
})

describe('GET /api/diaries/:id', () => {
  test('/api/diaries/:id returns 200 and nonempty json', async () => {
    const response = await supertest(app).get('/api/diaries/1');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(Object.keys(response.body).length).toBeGreaterThan(0)
  })
})
