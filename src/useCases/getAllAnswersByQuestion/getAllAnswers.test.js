const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { Answers } = require("../../repositories/sequelize/models");
const { Questions } = require("../../repositories/sequelize/models");
const { app } = require('../../app');

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste de Integração rota GET/answers/:id", () => {

  before(async () => {
    sinon
      .stub(Questions, 'create')
      .resolves({ id: 1, question: "O que é o sol?" });

    sinon
      .stub(Answers, 'create')
      .onCall(0)
      .resolves([
        { answer: "É uma estrela.", questionId: 1 },
        { answer: "É um satélte natural da terra.", questionId: 1 }
      ])
      .onCall(1)
      .resolves(null);

      sinon
      .stub(Questions, 'findAll')
      .onCall(0)
      .resolves([
        {
          id: 1,
          question: "O que é o sol?",
          Answers: [
            { answer: "É uma estrela.", questionId: 1 },
            { answer: "É um satélte natural da terra.", questionId: 1 }
          ]
        }
      ])
      .onCall(1)
      .resolves(null);
  });

  after(() => {
    Questions.create.restore();
  });

  after(() => {
    Answers.create.restore();
  });

  after(() => {
    Questions.findAll.restore();
  });
    
  describe("Deve ser capaz de retornar todas a answers de uma question", async () => {

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

    let getAllQuestions;

    before(async () => {
      getAllQuestions = await chai
        .request(app).get('/answers/1');
    });

    it("Deve retornar status 200", () => {
      expect(getAllQuestions.status).to.be.equals(200);
    });

    it("Deve retornar uma propriedade 'id' da question", () => {
      expect(getAllQuestions.body[0].id).to.be.equals(1);
    });

    it("Deve retornar uma propriedade 'questionId' da answer", () => {
      expect(getAllQuestions.body[0].Answers[0].questionId).to.be.equals(1);
    });

    it("Deve retornar a pergunta", () => {
      expect(getAllQuestions.body[0].question).to.be.equals('O que é o sol?');
    });

    it("Deve retornar as respostas", () => {
      expect(getAllQuestions.body[0].Answers[0].answer).to.be.equals('É uma estrela.');
      expect(getAllQuestions.body[0].Answers[1].answer).to.be.equals('É um satélte natural da terra.');
    });

    it("Se não mandar nada deve retornar status 404", async () => {
      newAnswer = await chai
        .request(app)
        .post('/answers/1')
        .send({});

        expect(newAnswer.status).to.be.equals(404);
    });

  });

});
