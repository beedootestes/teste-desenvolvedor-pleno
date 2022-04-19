const { Answers } = require('../models');

const create = async ({ answer, questionId }) => {
  try {
    const newAnswer = await Answers.create({ answer, questionId });
    return newAnswer;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  create,
};
