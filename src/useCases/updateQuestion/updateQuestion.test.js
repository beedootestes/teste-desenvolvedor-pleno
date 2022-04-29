const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { Questions } = require("../../repositories/sequelize/models");
const { app } = require('../../app');

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste de Integração rota PUT/questions/:id", () => {

  before(async () => {
    sinon
      .stub(Questions, 'create')
      .onCall(0)
      .resolves({ id: 1, question: "O que é o sol?" })
      .onCall(1)
      .resolves(null);
      
    sinon
      .stub(Questions, 'update')
      .onCall(0)
      .resolves({ id: 1, question: "O que é a lua?" })
      .onCall(1)
      .resolves(null);
  });

  after(() => {
    Questions.create.restore();
  });
    
  describe("Deve ser capaz de editar uma question", async () => {

    const questionData = {
      question: "O que é o sol?"
    };

    let newQuestion;
    let updateQuestion;

    before(async () => {
      newQuestion = await chai
        .request(app)
        .post('/questions')
        .send(questionData);
    });

    before(async () => {
      updateQuestion = await chai
        .request(app)
        .put('/questions/1')
        .send({ question: "O que é a lua?" });
    });

    it("Deve retornar status 200", () => {
      expect(updateQuestion.status).to.be.equals(200);
    });

    it("Deve retornar o mesmo 'id' da question antes de editar", () => {
      expect(updateQuestion.body.id).to.be.equals('1');
    });

    it("Deve retornar a nova 'question' passada", () => {
      expect(updateQuestion.body.question).to.be.equals('O que é a lua?');
    });

    it("Se nao existe essa question retornar um erro 400", async () => {
      newQuestion = await chai
        .request(app).post('/questions').send({});

        updateQuestion = await chai
          .request(app).get('/questions/2');
          
      expect(updateQuestion.status).to.be.equals(400);
    });

  });

});
