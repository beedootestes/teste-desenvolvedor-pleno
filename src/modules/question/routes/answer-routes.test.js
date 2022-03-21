import request from 'supertest';
import app from '../../../config/http/app';


async function  makeQuestion(question = 'Qual sua comida favorita?') {
  // create question to relation
  const newQuestion = await request(app).post('/api/question').send({
    question
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
      answer: 'Sopa', questionId: newQuestionId 
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
      answer: ''
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
      answer:''
    });

    expect (sut.status).toBe (400);
    expect (sut.body.message).toBe ('A resposta é obrigatória');

  });

  test ('should return 404 error when ID does not valid', async () => {

    const sut = await request (app).patch ('/api/answer/')

    expect (sut.status).toBe (404);
    expect (sut.body.message).toBe ('Não encontrado');

  });


});

describe('## DELETE ## Answer', () => {
  
  test ('should be able to remove a answer', async () => {
    const newQuestionId = await makeQuestion()
    //send answer
    
    const newAnswers = await request (app).post ('/api/answer').send ({
      answers: [         
        { answer: 'POSSO_SER_DELETADO', questionId: newQuestionId },
      ]
    });

    
    //get id answer to update
    const sutId = newAnswers.body.data[0]._id;
    
    // delete question
    const req = await request (app).delete (`/api/answer/${sutId}`);
    
    expect(req.status).toBe(200)       
  });
  
  test ('should return 404 error when ID does not valid', async () => {
    const newQuestionId = await makeQuestion()
    //send answer
    
    const newAnswers = await request (app).post ('/api/answer').send ({
      answers: [         
        { answer: 'POSSO_SER_DELETADO', questionId: newQuestionId },
      ]
    });


    // delete question
    const sut = await request (app).delete ('/api/answer/');
    
    expect (sut.status).toBe (404);
    expect (sut.body.message).toBe ('Não encontrado');     
  });

});


describe('## GET ## Answer', () => {
  
  test ('should list all the answer options for a question', async () => {
    const newQuestionId = await makeQuestion('Qual sua linguagem de programação favorita?')
    //send answer
    
    const newAnswers = await request (app).post ('/api/answer').send ({
      answers: [         
        { answer: 'NodeJs', questionId: newQuestionId },
        { answer: 'PHP', questionId: newQuestionId },
        { answer: 'Elix', questionId: newQuestionId },
        { answer: 'Python', questionId: newQuestionId },
        { answer: 'C', questionId: newQuestionId },
        { answer: 'C#', questionId: newQuestionId },
        { answer: 'Ruby', questionId: newQuestionId }        
      ]
    });
    
    // list answers by questionId
    const req = await request (app).get (`/api/answer/question/${newQuestionId}`);
    
    expect(req.status).toBe(200)       
    expect(req.body.message).toBe('lista de respostas')       
  });
 
 
  test ('must list all questions with their respective answer options', async () => {
    
    // list answers 
    const req = await request (app).get ('/api/answer/question/');
    
    expect(req.status).toBe(200)       
    expect(req.body.message).toBe('lista de perguntas e respostas')       
         
  });

});