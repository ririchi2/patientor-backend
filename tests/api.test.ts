import { app } from '../index'
import supertest from 'supertest';

describe('GET /api/ping', () => {
  test('/api/ping returns "pong"', async () => {
    const response = await supertest(app).get('/api/ping');

    expect(response.text).toBe('pong');
    expect(response.status).toBe(200);
  })
})

describe('/api/diaries', () => {
  test('/api/diaries returns 200 and nonempty json', async () => {
    const response = await supertest(app).get('/api/diaries');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body.length).toBeGreaterThan(0)
  })
  test('/api/diaries/:id returns 200 and nonempty json', async () => {
    const response = await supertest(app).get('/api/diaries/1');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(Object.keys(response.body).length).toBeGreaterThan(0)
  })
})

describe('/api/diagnoses', () => {
  test('/api/diagnoses returns 200 and nonempty json', async () => {
    const response = await supertest(app).get('/api/diagnoses');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body.length).toBeGreaterThan(0)
  })
})

describe('/api/patients', () => {
  test('/api/patients returns 200 and nonempty json', async () => {
    const response = await supertest(app).get('/api/patients');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body.length).toBeGreaterThan(0)
  })
  test('/api/patients/:id returns 200 and nonempty json', async () => {
    const response = await supertest(app).get('/api/patients/d2773336-f723-11e9-8f0b-362b9e155667');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(Object.keys(response.body).length).toBeGreaterThan(0)
  })
  test('/api/patients/:id returns 404', async () => {
    const response = await supertest(app).get('/api/patients/0');

    expect(response.status).toBe(404);
  })
})
