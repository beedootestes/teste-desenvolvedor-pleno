const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../src/api/app');
const { Questions } = require('../src/models');

chai.use(chaiHttp);
const { expect } = chai;

describe("Rota 'POST /questions'", () => {
  before(async () => {
    sinon
      .stub(Questions, 'create')
      .resolves({
        id: 1,
        question: 'Quem foi a primeira pessoa a viajar no Espaço?',
      });
  });

  after(() => {
    Questions.create.restore();
  });

  describe("Quando a pergunta é criada com sucesso", () => {
    let response;

    const payload = {
      question: 'Quem foi a primeira pessoa a viajar no Espaço?'
    };

    before(async () => {
      response = await chai
        .request(app)
        .post('/questions')
        .send(payload);
    });

    it("Deveria retorna http status 201", async () => {
      expect(response).to.have.status(201);
    });

    it('Deveria retornar um objeto', () => {
      expect(response.body).to.be.have.a('object');
    });

    it("Deveria retornar um objeto com as propriedades 'id' e 'question'", () => {
      expect(response.body).to.be.have.a.property('id');
      expect(response.body).to.be.have.a.property('question');
    });
  });
});

describe("Rota 'GET /questions'", () => {
  const questions = [
    {
      id: 1,
      question: 'Quem foi a primeira pessoa a viajar no Espaço?',
    },
    {
      id: 2,
      question: 'Qual a montanha mais alta do mundo?',
    },
    {
      id: 3,
      question: 'Que país tem o formato de uma bota?',
    }
  ];
  before(async () => {
    sinon
      .stub(Questions, 'findAll')
      .resolves(questions);
  });

  after(() => {
    Questions.findAll.restore();
  });

  describe("Quando a requisição é feita com sucesso", () => {
    let response;

    before(async () => {
      response = await chai
        .request(app)
        .get('/questions');
    });

    it("Deveria retorna http status 200", async () => {
      expect(response).to.have.status(200);
    });

    it('Deveria retornar um objeto', () => {
      expect(response.body).to.be.have.a('array');
    });

    it('Deveria retornar um array de objetos com as perguntas cadastradas', () => {
      expect(response.body).to.be.length(3);
    });

    it("Deveria retornar um array de objetos com as propriedades 'id' e 'question'", () => {
      expect(response.body[0]).to.be.have.a.property('id');
      expect(response.body[0]).to.be.have.a.property('question');
    });
  });
});