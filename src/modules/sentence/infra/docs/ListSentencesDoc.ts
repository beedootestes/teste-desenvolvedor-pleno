const ListSentencesDoc = {
  tags: ['Sentence'],
  description: 'List Sentence records for given search parameters',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            pageOffSet: {
              type: 'integer',
            },
            pageCount: {
              type: 'integer',
            },
            pageSize: {
              type: 'integer',
            },
            filter: {
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
                  enum: ['QUESTION', 'ANSWER'],
                },
                enabled: {
                  type: 'boolean',
                },
              },
            },
          },
          example: {
            pageOffSet: 0,
            pageCount: 1,
            pageSize: 20,
            filter: {
              type: 'QUESTION',
            },
          },
        },
      },
    },
  },
  operationId: 'listSentencesDoc',
  security: [
    {
      BearerAuth: [],
      BasicAuth: [],
    },
  ],
  responses: {
    200: {
      description: 'Sentences',
      Sentence: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              pageSize: {
                type: 'integer',
              },
              totalItems: {
                type: 'integer',
              },
              results: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    index: {
                      type: 'object',
                      properties: {
                        page: { type: 'integer' },
                        index: { type: 'integer' },
                      },
                    },
                    sentence: {
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

export default ListSentencesDoc;
