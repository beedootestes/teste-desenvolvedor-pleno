import request from 'supertest';
import app from '../../../config/http/app';

describe ('## POST ## Answer', () => {

  test ('should record responses if all fields are ok', async () => {
   
    // create question to relation
    const newQuestion = await request (app).post ('/api/question').send ({
      question: 'Qual sua comida favorita?',
    });

    // get id question
    const newQuestionId = newQuestion.body.data.id
    
    const sut = await request (app).post ('/api/answer').send ({
      answers: [ 
        { answer: 'Farofa', questionId: newQuestionId },
        { answer: 'Macarronada', questionId: newQuestionId },
        { answer: 'Churrasco', questionId: newQuestionId },
      ]
    });

    expect (sut.body.message).toBe ('Answer registered successfully');

  });

  test ('should return error when questionID does not valid', async () => {
   
    // create question to relation
    const newQuestion = await request (app).post ('/api/question').send ({
      question: 'Qual sua comida favorita?',
    });

    // get id question
    const newQuestionId = newQuestion.body.data.id
    
    //send answer missing questionId
    const sut = await request (app).post ('/api/answer').send ({
      answers: [ 
        { answer: 'Farofa',  },
        { answer: 'Macarronada', questionId: newQuestionId },
        { answer: 'Churrasco', questionId: newQuestionId },
      ]
    });

    expect (sut.status).toBe (400);
    expect (sut.body.message).toBe ('O Código da questão é obrigatória');

  });

  test ('should return error when answer does not valid', async () => {
   
    // create question to relation
    const newQuestion = await request (app).post ('/api/question').send ({
      question: 'Qual sua comida favorita?',
    });

    // get id question
    const newQuestionId = newQuestion.body.data.id
    
    //send missing answer  
    const sut = await request (app).post ('/api/answer').send ({
      answers: [         
        {  questionId: newQuestionId },
        { answer: 'Churrasco', questionId: newQuestionId },
      ]
    });

    expect (sut.status).toBe (400);
    expect (sut.body.message).toBe ('A resposta é obrigatória');

  });


});
