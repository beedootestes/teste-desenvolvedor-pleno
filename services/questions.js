const { questions } = require('../models');

const getAll = async () => {
  const allQuestions = await questions.findAll({ raw: true });

  if (!allQuestions) return null;

  return allQuestions;
}

modules.export = { getAll };
