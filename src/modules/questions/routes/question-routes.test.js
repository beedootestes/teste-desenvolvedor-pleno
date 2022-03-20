import request from 'supertest';
import app from '../../../config/http/app';

describe ('Question Router', () => {
  test ('Should return an list of questions on sucess', async () => {
    
    const req = await request (app).get ('/api/question');
    
    expect(req.status).toBe(200)       

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

    expect (req.body.message).toBe ('Question registered successfully');
  });


  test ('should return a question filtered by its id', async () => {
    // create question
    const reqPost = await request (app).post ('/api/question').send ({
      question: 'Teste api,  ?',
    });

    // get id
    const id = reqPost.body.data.id
    
    //get question
    const req = await request (app).get (`/api/question/${id}`);
    
    expect(req.status).toBe(200)    
    expect(req.body.data).toBeTruthy()    

  });


});
