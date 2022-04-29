const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { Questions } = require("../../repositories/sequelize/models");
const { app } = require('../../app');

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste de Integração rota GET/questions/:id", () => {

  before(async () => {
    sinon
      .stub(Questions, 'create')
      .onCall(0)
      .resolves({ id: 1, question: "O que é o sol?" })
      .onCall(1)
      .resolves(null);
      
    sinon
      .stub(Questions, 'findByPk')
      .onCall(0)
      .resolves({ id: 1, question: "O que é o sol?" })
      .onCall(1)
      .resolves(null);
  });

  after(() => {
    Questions.create.restore();
  });
    
  describe("Deve ser capaz de criar uma nova question", async () => {

    const questionData = {
      question: "O que é o sol?"
    };

    let newQuestion;
    let getQuestion;

    before(async () => {
      newQuestion = await chai
        .request(app)
        .post('/questions')
        .send(questionData);
    });

    before(async () => {
      getQuestion = await chai
        .request(app).get('/questions/1');
    });

    it("Deve retornar status 200", () => {
      expect(getQuestion.status).to.be.equals(200);
    });

    it("Deve retornar o 'id' passado", () => {
      expect(getQuestion.body.id).to.be.equals(1);
    });

    it("Deve retornar a 'question' passada", () => {
      expect(getQuestion.body.question).to.be.equals('O que é o sol?');
    });

    it("Se nao existe essa question retornar um erro 400", async () => {
      newQuestion = await chai
        .request(app).post('/questions').send({});

        getQuestion = await chai
          .request(app).get('/questions/2');
          
      expect(getQuestion.status).to.be.equals(400);
    });

  });

});
