const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../src/api/app');
const { Answers } = require('../src/models');
const answers = require('./mock/answers');

chai.use(chaiHttp);
const { expect } = chai;

describe("Rota 'POST /answers'", () => {
  before( async () => {
    sinon
      .stub(Answers, 'create')
      .callsFake(answers.create);
  });

  after(() => {
    Answers.create.restore();
  });

  describe("Quando a resposta é criada com sucesso", () => {
    let response;

    const payload = {
      answer: 'Pico da Neblina',
      questionId: 2
    };

    before( async () => {
      response = await chai
        .request(app)
        .post('/answers')
        .send(payload);
    });

    it("Deveria retorna http status 201", () => {
      expect(response).to.have.status(201);
    });

    it("Deveria retornar um objeto", () => {
      expect(response.body).to.be.have.a('object');
    });

    it("Deveria retornar um objeto com as propriedades 'id', 'answer' e 'questionId'", () => {
      expect(response.body).to.be.have.a.property('id');
      expect(response.body).to.be.have.a.property('answer');
      expect(response.body).to.be.have.a.property('questionId');
    });
  });
});