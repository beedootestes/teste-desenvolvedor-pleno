const { Questions } = require("../../repositories/sequelize/models");
const { mysqlCreateQuestion } = require("../../repositories/implementationsQuestions/mysqlCreate");

const existsQuestion = async (question) => {
  const verifyIfAlreadyExists = await Questions.findOne({ where: { question } });
  return verifyIfAlreadyExists;
}

const createQuestionUseCase = async (question) => {
  const ifExistsQuestion = await existsQuestion(question);

  if (ifExistsQuestion) {
    throw new Error('Question already exists, please insert other.')
  }

  const createQuestion = await mysqlCreateQuestion(question);
  return createQuestion;
}

module.exports = { createQuestionUseCase };
