const CreateSentenceDoc = {
  tags: ['Sentence'],
  description: 'Creates a Sentence',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            question: {
              type: 'integer',
            },
            text: {
              type: 'integer',
            },
            type: {
              type: 'string',
              enum: ['QUESTION', 'ANSWER'],
            },
          },
          required: ['text', 'type'],
          example: {
            text: 'Que horas são?',
            type: 'QUESTION',
          },
        },
      },
    },
  },
  operationId: 'createSentenceDoc',
  security: [
    {
      BearerAuth: [],
      BasicAuth: [],
    },
  ],
  responses: {
    201: {
      description: 'Sentence created',
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
      description: 'Question does not exist',
    },
  },
};

export default CreateSentenceDoc;
