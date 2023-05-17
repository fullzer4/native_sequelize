import request from 'supertest';
import { app } from '../src/index';

describe('Teste "/"', () => {
  it('Verificar get', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
  });
});