const { Questions } = require('../models');

const create = async (question) => {
  try {
    const newQuestion = await Questions.create({ question });
    return newQuestion;
  } catch (error) {
    console.error(`Error: Aqui ${error}`);
  }
}

module.exports = {
  create,
};
