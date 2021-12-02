const UpdateSentenceDoc = {
  tags: ['Sentence'],
  description: 'Updates a specific Sentence',
  operationId: 'updateSentencesDoc',
  parameters: [{
    in: 'path',
    name: 'sentenceId',
    schema: {
      type: 'integer',
    },
    required: true,
    description: 'id',
  }],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            text: {
              type: 'integer',
            },
          },
          example: {
            text: 'Qual a boa?',
          },
        },
      },
    },
  },
  security: [
    {
      BearerAuth: [],
      BasicAuth: [],
    },
  ],
  responses: {
    200: {
      description: 'Sentence updated',
      Sentence: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
              },
              question: {
                type: 'integer',
              },
              text: {
                type: 'string',
              },
              type: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    400: {
      description: 'Problem on the request body',
    },
    404: {
      description: 'Could not find Sentence',
    },
  },
};

export default UpdateSentenceDoc;
