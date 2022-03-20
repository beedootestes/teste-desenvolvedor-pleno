import request from 'supertest';
import app from '../../../config/http/app';

describe ('Question Router', () => {
  test ('Should return an list of questions on sucess', async () => {
    await request (app).get ('/api/question').expect (200);
  });

  test ('should fail if the question is null or length < 1', async () => {
    const req = await request (app).post ('/api/question').send ({
      question: '',
    });

    expect (req.status).toBe(422);
  });

  test ('Should be able to enter a question', async () => {
    const req = await request (app).post ('/api/question').send ({
      question: 'Qual país ?',
    });

    expect (req.body).toEqual (
      {message: 'Question registered successfully'});
  });


});
