const app = require('../../app');
const request = require('supertest');

describe('GET /questions', () => {
  it('Deve retornar todas as perguntas com o Status HTTP 200 ', async () => {
    const response = await request(app)
        .get('/questions')
        .set('Accept', 'application/json')
    expect(response.headers["Content-Type"]).toMatch(/json/);
    expect(response.statusCode).toEqual(200);
  });
  it('Deve retornar um array vazio caso nenhuma pergunta tenha sido cadastrada com Status HTTP 204', async () => {
   const response = await request(app)
     .get('/question')
     .set('Accept', 'application/json')
    expect(response.body).toEqual([]);
    expect(response.statusCode).toEqual(204);
  });
});
