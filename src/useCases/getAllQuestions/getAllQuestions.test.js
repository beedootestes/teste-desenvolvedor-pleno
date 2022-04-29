const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { Questions } = require("../../repositories/sequelize/models");
const { app } = require('../../app');

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste de Integração rota GET/questions", () => {

  before(async () => {
    sinon
      .stub(Questions, 'create')
      .onCall(0)
      .resolves([
        { id: 1, question: "O que é o sol?" },
        { id: 2, question: "O que é a lua?" }
      ])
      .onCall(1)
      .resolves(null);
      
    sinon
      .stub(Questions, 'findAll')
      .onCall(0)
      .resolves([
        { id: 1, question: "O que é o sol?" },
        { id: 2, question: "O que é a lua?" }
      ])
      .onCall(1)
      .resolves(null);
  });

  after(() => {
    Questions.create.restore();
  });
    
  describe("Deve ser capaz de buscar todas as questions", async () => {

    const questionData = {
      question: "O que é o sol?",
      question: "O que é a lua?"
    };

    let newQuestion;
    let getAllQuestions;

    before(async () => {
      newQuestion = await chai
        .request(app)
        .post('/questions')
        .send(questionData);
    });

    before(async () => {
      getAllQuestions = await chai
        .request(app).get('/questions');
    });

    it("Deve retornar status 200", () => {
      expect(getAllQuestions.status).to.be.equals(200);
    });

    it("Deve retornar uma propriedade 'id'", () => {
      expect(getAllQuestions.body[0]).to.be.have.a.property('id');
    });

    it("Deve retornar um array com um ou mais objetos", () => {
      expect(getAllQuestions.body).to.be.have.a('array');
    });

    it("Se nao existem questions retornar um erro 400", async () => {
      newQuestion = await chai
        .request(app).post('/questions').send({});

        getAllQuestions = await chai
          .request(app).get('/questions');
          
      expect(getAllQuestions.status).to.be.equals(400);
    });

  });

});
