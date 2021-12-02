const DeleteSentenceDoc = {
  tags: ['Sentence'],
  description: 'Deletes a specific Sentence',
  operationId: 'deleteSentencesDoc',
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
      description: 'Sentence deleted',
    },
    404: {
      description: 'Could not find Sentence',
    },
    502: {
      description: 'Could not delete Sentence',
    },
  },
};

export default DeleteSentenceDoc;
