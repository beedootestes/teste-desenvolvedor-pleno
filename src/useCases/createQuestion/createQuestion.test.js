const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { Questions } = require("../../repositories/sequelize/models");
const { app } = require('../../app');

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste de Integração rota POST/questions", () => {

  before(async () => {
    sinon
      .stub(Questions, 'create')
      .resolves({ id: 1, question: "O que é o sol?" });
      
    sinon
      .stub(Questions, 'findOne')
      .onCall(0)
      .resolves(null)
      .onCall(1)
      .resolves({ id: 1, question: "O que é o sol?" });
  });

  after(() => {
    Questions.create.restore();
  });
    
  describe("Deve ser capaz de criar uma nova question", async () => {

    const questionData = {
      question: "O que é o sol?",
    };

    let newQuestion;

    before(async () => {
      newQuestion = await chai
        .request(app)
        .post('/questions')
        .send(questionData);
    });

    it("Deve retornar status 201", () => {
      expect(newQuestion.status).to.be.equals(201);
    });

    it("Deve retornar uma propriedade 'id'", () => {
      expect(newQuestion.body).to.be.have.a.property('id');
    });

    it("O conteúdo da resposta tem que ser o mesmo que foi enviado", () => {
      expect(newQuestion.body.question).to.be.equals('O que é o sol?');
    });

    it("Se a question já existe deve retornar um erro", async () => {
      newQuestion = await chai
        .request(app)
        .post('/questions')
        .send(questionData);
      expect(newQuestion.body.message).to.be.equals('Question already exists, please insert other.');
    });

  });

});
