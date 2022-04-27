const { mysqlUpdate } = require("../../repositories/implementationsQuestions/mysqlUpdate");

const updateQuestionUseCase = async (id, question) => {
  const updateQuestion = await mysqlUpdate(id, question);
  return updateQuestion;
}

module.exports = { updateQuestionUseCase };
