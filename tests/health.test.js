const request = require('supertest');
const app = require('../src/server'); // Importa a instância do Express

describe('Health Endpoint', () => {
  it('should return 200 and status UP on /health', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'UP');
  });
});
