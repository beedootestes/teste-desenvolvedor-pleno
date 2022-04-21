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

describe("Rota 'GET /answers'", () => {
  before( async () => {
    sinon
      .stub(Answers, 'findAll')
      .callsFake(answers.getAll);
  });

  after(() => {
    Answers.findAll.restore();
  });

  describe("Quando a resposta é criada com sucesso", () => {
    let response;

    before( async () => {
      response = await chai
        .request(app)
        .get('/answers');
    });

    it("Deveria retorna http status 200", () => {
      expect(response).to.have.status(200);
    });

    it("Deveria retornar um array", () => {
      expect(response.body).to.be.have.a('array');
    });

    it("Deveria retornar um objeto com as propriedades 'id', 'question', 'Answer'", () => {
      expect(response.body[0]).to.be.have.a.property('id');
      expect(response.body[0]).to.be.have.a.property('question');
      expect(response.body[0]).to.be.have.a.property('Answer');
    });
  });
});

describe("Rota 'GET /answers/:id'", () => {
  before(async () => {
    sinon
      .stub(Answers, 'findByPk')
      .callsFake(answers.getById);
  });

  after(() => {
    Answers.findByPk.restore();
  });

  describe("Quando a requisição é feita com sucesso", () => {
    let response;

    before(async () => {
      response = await chai
        .request(app)
        .get('/answers/3');
    });

    it("Deveria retorna http status 200", async () => {
      expect(response).to.have.status(200);
    });

    it("Deveria retornar um objeto", () => {
      expect(response.body).to.be.have.a('object');
    });

    it("Deveria retornar um objeto com as propriedades 'id', 'answer' e 'questionId'", () => {
      expect(response.body).to.be.have.a.property('id');
      expect(response.body).to.be.have.a.property('answer');
      expect(response.body).to.be.have.a.property('questionId');
    });

    it('Deveria retornar um objeto com a resposta correta', () => {
      expect(response.body.id).to.be.equal(3);
      expect(response.body.answer).to.be.equal('Monte Everest');
      expect(response.body.questionId).to.be.equal(2);
    });
  });
});

describe("Rota 'PUT /answers/:id", () => {
  before(() => {
    sinon
      .stub(Answers, 'update')
      .callsFake(answers.update);
  });

  after(() => {
    Answers.update.restore();
  });

  describe("Quando a pergunta é atualizada com sucesso", () => {
    let response;

    const payload = {
      answer: 'Neil Armstrong Jr',
      questionId: 1,
    };

    before(async () => {
      response = await chai
        .request(app)
        .put('/answers/2')
        .send(payload);
    });

    it("Deveria retorna http status 201", () => {
      expect(response).to.be.status(201);
    });

    it("Deveria retornar um objeto", () => {
      expect(response.body).to.be.have.a('object');
    });

    it("Deveria retornar um objeto com as propriedades 'id', 'answer' e 'questionId'", () => {
      expect(response.body).to.be.have.a.property('id');
      expect(response.body).to.be.have.a.property('answer');
      expect(response.body).to.be.have.a.property('questionId');
    });

    it("Deveria retornar um objeto com a resposta atualizada", () => {
      expect(response.body.id).to.be.equal('2');
      expect(response.body.answer).to.be.equal(payload.answer);
      expect(response.body.questionId).to.be.equal(payload.questionId);
    });
  });
});
