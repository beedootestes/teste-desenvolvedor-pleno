const { mysqlCreateAnswers } = require("../../repositories/implementationsAnswers/mysqlCreate");

const createAnswerUseCase = async (answers) => {
  const createAnswers = await mysqlCreateAnswers(answers);
  return createAnswers;
}

module.exports = { createAnswerUseCase };
