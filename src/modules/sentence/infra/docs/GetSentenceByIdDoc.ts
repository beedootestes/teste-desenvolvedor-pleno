const GetSentenceByIdDoc = {
  tags: ['Sentence'],
  description: 'Returns information of a specific Sentence',
  parameters: [{
    in: 'path',
    name: 'sentenceId',
    schema: {
      type: 'integer',
    },
    required: true,
    description: 'id',
  }],
  operationId: 'getSentenceByIdDoc',
  security: [
    {
      BearerAuth: [],
      BasicAuth: [],
    },
  ],
  responses: {
    200: {
      description: 'Sentence',
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
    404: {
      description: 'Sentence not Found',
    },
  },
};

export default GetSentenceByIdDoc;
