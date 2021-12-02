const ReactivateSentenceDoc = {
  tags: ['Sentence'],
  description: 'Reactivate a specific Sentence',
  operationId: 'reactivateSentencesDoc',
  parameters: [{
    in: 'path',
    name: 'sentenceId',
    schema: {
      type: 'integer',
    },
    required: true,
    description: 'id',
  }],
  security: [
    {
      BearerAuth: [],
      BasicAuth: [],
    },
  ],
  responses: {
    204: {
      description: 'Sentence reactivate',
    },
    404: {
      description: 'Could not find Sentence',
    },
  },
};

export default ReactivateSentenceDoc;
