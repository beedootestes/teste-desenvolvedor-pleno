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
    
    const sut = await request (app).post ('/api/question').send ({
      question: 'Qual país ?',
    });

    // get id
    const id = sut.body.data.id

    // delete question
    await request (app).delete (`/api/question/${id}`).expect(200);

    expect (sut.body.message).toBe ('Question registered successfully');
  });


  test ('should return a question filtered by its id', async () => {
    // create question
    const reqPost = await request (app).post ('/api/question').send ({
      question: 'Teste api,  ?',
    });

    // get id
    const id = reqPost.body.data.id
    
    // get question
    const sut = await request (app).get (`/api/question/${id}`);

    // delete question
    await request (app).delete (`/api/question/${id}`);
    
    expect(sut.status).toBe(200)    
    expect(sut.body.data).toBeTruthy()    

  });

  test ('should be able to remove a question', async () => {
    // create question
    const reqPost = await request (app).post ('/api/question').send ({
      question: 'Poderei_ser_removido_?',
    });

    // get id
    const id = reqPost.body.data.id
    
    // delete question
    const req = await request (app).delete (`/api/question/${id}`);
    
    expect(req.status).toBe(200)    
    expect(req.body.data).toBeTruthy()    

  });

  test ('should be able to update a question', async () => {
    // create question
    const reqPost = await request (app).post ('/api/question').send ({
      question: 'Poderei_ser_atualizado_?',
    })

    // get id
    const id = reqPost.body.data.id
    
    // update question
    const sut = await request (app).patch (`/api/question/${id}`).send({
      question: 'Fui_atualizado_?',
    })
    
    // delete question
    await request (app).delete (`/api/question/${id}`).expect(200);
    
    expect(sut.status).toBe(200)       

  });

});
