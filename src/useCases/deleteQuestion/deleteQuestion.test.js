const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { Questions } = require("../../repositories/sequelize/models");
const { app } = require('../../app');

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste de Integração rota DELETE/questions/:id", () => {

  before(async () => {
    sinon
      .stub(Questions, 'create')
      .resolves({ id: 1, question: "O que é o sol?" })
      
    sinon
      .stub(Questions, 'destroy')
      .resolves(null);
  });

  after(() => {
    Questions.create.restore();
  });
    
  describe("Deve ser capaz de deletar uma question", async () => {

    const questionData = {
      question: "O que é o sol?"
    };

    let newQuestion;
    let deleteQuestion;

    before(async () => {
      newQuestion = await chai
        .request(app)
        .post('/questions')
        .send(questionData);
    });

    before(async () => {
      deleteQuestion = await chai
        .request(app)
        .delete('/questions/1');
    });

    it("Deve retornar status 200", () => {
      expect(deleteQuestion.status).to.be.equals(200);
    });

    it("Deve retornar a mensagem 'Question Deleted!'", () => {
      expect(deleteQuestion.body.message).to.be.equals('Question Deleted!');
    });

  });

});
