const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { Answers } = require("../../repositories/sequelize/models");
const { app } = require('../../app');

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste de Integração rota POST/answers", () => {

  before(async () => {
    sinon
      .stub(Answers, 'create')
      .onCall(0)
      .resolves([
        {
          answer: "É uma estrela.",
          questionId: 1
        },
        {
          answer: "É um satélte natural da terra.",
          questionId: 1
        }
      ])
      .onCall(1)
      .resolves(null)
  });

  after(() => {
    Answers.create.restore();
  });
    
  describe("Deve ser capaz de criar novas answers", async () => {

    const answersData = [
      {
        answer: "É uma estrela.",
        questionId: 1
      },
      {
        answer: "É um satélte natural da terra.",
        questionId: 1
      }
    ];

    let newAnswer;

    before(async () => {
      newAnswer = await chai
        .request(app)
        .post('/answers')
        .send(answersData);
    });

    it("Deve retornar status 201", () => {
      expect(newAnswer.status).to.be.equals(201);
    });

    it("Deve retornar a mensagem 'Answers Inserted!'", () => {
      expect(newAnswer.body.message).to.be.equals('Answers Inserted!');
    });

    it("Se não mandar nada deve retornar status 400", async () => {
      newAnswer = await chai
        .request(app)
        .post('/answers')
        .send({});
        
        expect(newAnswer.status).to.be.equals(400);
    });

  });

});
