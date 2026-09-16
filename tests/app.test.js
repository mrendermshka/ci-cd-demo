const request = require('supertest');
const app = require('../src/app');

describe('GET /api/health', () => {
  it('повертає статус ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('GET /api/rooms?maxPrice=', () => {
  it('повертає кімнати з ціною не більше maxPrice', async () => {
    const res = await request(app).get('/api/rooms?maxPrice=1200');
    expect(res.status).toBe(200);
    expect(res.body.map((r) => r.name)).toEqual(['Standard']);
  });
});

describe('GET /api/rooms/:id', () => {
  it('повертає кімнату за id', async () => {
    const res = await request(app).get('/api/rooms/1');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Standard');
  });

  it('повертає 404, якщо кімнати немає', async () => {
    const res = await request(app).get('/api/rooms/999');
    expect(res.status).toBe(404);
  });
});

describe('POST /api/rooms', () => {
  it('створює кімнату', async () => {
    const res = await request(app).post('/api/rooms').send({ name: 'Suite', price: 4000 });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ name: 'Suite', price: 4000 });
  });

  it('повертає 400 для короткої назви', async () => {
    const res = await request(app).post('/api/rooms').send({ name: 'A', price: 100 });
    expect(res.status).toBe(400);
  });

  it('повертає 400 для від\'ємної ціни', async () => {
    const res = await request(app).post('/api/rooms').send({ name: 'Economy', price: -5 });
    expect(res.status).toBe(400);
  });
});
