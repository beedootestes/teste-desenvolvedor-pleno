import * as SentenceDocs from '@modules/sentence/infra/docs';

const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'REST API Questions',
    version: '1.0.0.',
    description: 'Questions App Backend.',
    hosts: 'localhost:4202/api',
    contact: {
      name: 'Matheus Melo',
      email: 'math.li.melo@gmail.com',
      url: 'https://questions.com.br',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
};

const options = {
  openapi: swaggerDefinition.openapi,
  info: swaggerDefinition.info,
  servers: [{
    url: 'http://localhost:4202/api/v1',
    description: 'Local server',
  }, {
    url: `${process.env.SWAGGER_CUSTOM_SERVER_URL}/api/v1`,
    description: 'Custom server',
  }],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'BearerAuthtentication',
      },
      BasicAuth: {
        type: 'http',
        scheme: 'basic',
      },
    },
  },
  tags: [{
    name: 'Sentence',
    description: 'CRUD para Sentences',
  }],
  paths: {
    //* Sentences paths
    '/sentences': { post: SentenceDocs.CreateSentenceDoc },
    '/sentences/list': { post: SentenceDocs.ListSentencesDoc },
    '/sentences/list/questions': { get: SentenceDocs.ListQuestionsDoc },
    '/sentences/{sentenceId}': { get: SentenceDocs.GetSentenceByIdDoc, patch: SentenceDocs.UpdateSentenceDoc, delete: SentenceDocs.DeleteSentenceDoc },
    '/sentences/{sentenceId}/reactivate': { patch: SentenceDocs.ReactivateSentenceDoc },
  },
};

export default options;
