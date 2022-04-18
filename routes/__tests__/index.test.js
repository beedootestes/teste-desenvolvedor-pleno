const app = require('../../index');
const request = require('supertest');

describe('GET /questions', () => {
  it('Deve retornar todas as perguntas com o Status HTTP 200 ', async () => {
    const response = await request(app)
        .get('/questions')
        .set('Accept', 'application/json')
    expect(response.statusCode).toEqual(200);
  });
});

// describe('POST /questions', () => {
//   it('Deve retornar com Status HTTP 201', async () => {
//     const response = await request(app)
//       .post('/questions')

//   });
// });
