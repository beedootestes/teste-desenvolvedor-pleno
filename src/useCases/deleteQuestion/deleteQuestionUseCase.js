const { mysqlDeleteQuestion } = require("../../repositories/implementationsQuestions/mysqlDelete");

const deleteQuestionUseCase = async (id) => {
  await mysqlDeleteQuestion(id);
}

module.exports = { deleteQuestionUseCase };
