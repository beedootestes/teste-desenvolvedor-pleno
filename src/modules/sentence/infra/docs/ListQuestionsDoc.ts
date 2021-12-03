const ListQuestionsDoc = {
  tags: ['Sentence'],
  description: 'List All Questions and its Answers',
  operationId: 'listQuestionsDoc',
  security: [
    {
      BearerAuth: [],
      BasicAuth: [],
    },
  ],
  responses: {
    200: {
      description: 'Questions',
      Sentence: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              questions: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                    },
                    text: {
                      type: 'string',
                    },
                    answers: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'integer',
                          },
                          text: {
                            type: 'string',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    404: {
      description: 'Problem on the url query',
    },
  },
};

export default ListQuestionsDoc;
