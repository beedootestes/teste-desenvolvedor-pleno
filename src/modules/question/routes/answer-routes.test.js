import request from 'supertest';
import app from '../../../config/http/app';


async function  makeQuestion() {
  // create question to relation
  const newQuestion = await request(app).post('/api/question').send({
    question: 'Qual sua comida favorita?',
  });
  
  // get id question
  return newQuestion.body.data.id
}

describe ('## POST ## Answer', () => {
  
  test ('should record responses if all fields are ok', async () => {
    
    const newQuestionId = await makeQuestion()
    
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
    
    const newQuestionId = await makeQuestion()
    
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
   
    const newQuestionId = await makeQuestion()
    
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

describe ('## PATCH ## Answer', () => {
  
  test ('should update responses if all fields are ok', async () => {
    
    const newQuestionId = await makeQuestion()
    //send answer
    
    const newAnswers = await request (app).post ('/api/answer').send ({
      answers: [         
        { answer: 'POSSO_SER_ATUALIZADO_01', questionId: newQuestionId },
        { answer: 'POSSO_SER_ATUALIZADO_02', questionId: newQuestionId },
      ]
    });

    
    //get id answer to update
    const sutId = newAnswers.body.data[0]._id;
    
    const sut = await request (app).patch (`/api/answer/${sutId}`).send ({
      answer: {answer: 'Sopa', questionId: newQuestionId }
    });

    expect (sut.body.message).toBe ('Resposta atualizada com sucesso');

  });

  test ('should return error when answer does not valid', async () => {
   
    const newQuestionId = await makeQuestion()
    
    const newAnswers = await request (app).post ('/api/answer').send ({
      answers: [         
        { answer: 'POSSO_SER_ATUALIZADO_01', questionId: newQuestionId },
        { answer: 'POSSO_SER_ATUALIZADO_02', questionId: newQuestionId },
      ]
    });

    
    //get id answer to update
    const sutId = newAnswers.body.data[0]._id;

    const sut = await request (app).patch (`/api/answer/${sutId}`).send ({
      answer: { }
    });

    expect (sut.status).toBe (400);
    expect (sut.body.message).toBe ('A resposta é obrigatória');

  });


  test ('should return error when answer does not valid', async () => {
   
    const newQuestionId = await makeQuestion()
    
    const newAnswers = await request (app).post ('/api/answer').send ({
      answers: [         
        { answer: 'POSSO_SER_ATUALIZADO_01', questionId: newQuestionId },
        { answer: 'POSSO_SER_ATUALIZADO_02', questionId: newQuestionId },
      ]
    });

    
    //get id answer to update
    const sutId = newAnswers.body.data[0]._id;

    const sut = await request (app).patch (`/api/answer/${sutId}`).send ({
      answer: { }
    });

    expect (sut.status).toBe (400);
    expect (sut.body.message).toBe ('A resposta é obrigatória');

  });

  test ('should return error when ID does not valid', async () => {

    const sut = await request (app).patch ('/api/answer/')

    expect (sut.status).toBe (404);
    expect (sut.body.message).toBe ('Não encontrado');

  });


});