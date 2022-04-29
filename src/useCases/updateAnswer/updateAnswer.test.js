const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { Answers } = require("../../repositories/sequelize/models");
const { app } = require('../../app');

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste de Integração rota PUT/answers/:id", () => {

  before(async () => {
    sinon
      .stub(Answers, 'create')
      .onCall(0)
      .resolves({ id: 1, answer: "É uma estrela." })
      .onCall(1)
      .resolves(null);
      
    sinon
      .stub(Answers, 'update')
      .onCall(0)
      .resolves({ id: 1, answer: "É uma estrela que nos fornece energia." })
      .onCall(1)
      .resolves(null);
  });

  after(() => {
    Answers.create.restore();
  });
    
  describe("Deve ser capaz de editar uma answer", async () => {

    const answerData = {
      answer: "É uma estrela."
    };

    let newAnswer;
    let updateAnswer;

    before(async () => {
      newAnswer = await chai
        .request(app)
        .post('/answers')
        .send(answerData);
    });

    before(async () => {
      updateAnswer = await chai
        .request(app)
        .put('/answers/1')
        .send({ answer: "É uma estrela que nos fornece energia." });
    });

    it("Deve retornar status 200", () => {
      expect(updateAnswer.status).to.be.equals(200);
    });

    it("Deve retornar o mesmo 'id' da question antes de editar", () => {
      expect(updateAnswer.body.id).to.be.equals('1');
    });

    it("Deve retornar a nova 'answer' passada", () => {
      expect(updateAnswer.body.answer).to.be.equals('É uma estrela que nos fornece energia.');
    });

    it("Se nao existe essa question retornar um erro 400", async () => {
      newQuestion = await chai
        .request(app).post('/questions').send({});

        updateAnswer = await chai
          .request(app).get('/questions/2');
          
      expect(updateAnswer.status).to.be.equals(400);
    });

  });

});
