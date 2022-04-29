const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { Answers } = require("../../repositories/sequelize/models");
const { app } = require('../../app');

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste de Integração rota DELETE/answers/:id", () => {

  before(async () => {
    sinon
      .stub(Answers, 'create')
      .resolves({ id: 1, answer: "É uma estrela." })
      
    sinon
      .stub(Answers, 'destroy')
      .resolves(null);
  });

  after(() => {
    Answers.create.restore();
  });
    
  describe("Deve ser capaz de deletar uma answer", async () => {

    const answerData = {
      answer: "É uma estrela.?"
    };

    let newAnswer;
    let deleteAnswer;

    before(async () => {
      newAnswer = await chai
        .request(app)
        .post('/answers')
        .send(answerData);
    });

    before(async () => {
      deleteAnswer = await chai
        .request(app)
        .delete('/answers/1');
    });

    it("Deve retornar status 200", () => {
      expect(deleteAnswer.status).to.be.equals(200);
    });

    it("Deve retornar a mensagem 'Answer Deleted!'", () => {
      expect(deleteAnswer.body.message).to.be.equals('Answer Deleted!');
    });

  });

});
