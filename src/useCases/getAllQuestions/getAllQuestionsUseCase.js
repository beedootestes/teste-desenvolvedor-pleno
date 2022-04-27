const { mysqlGetAllQuestions } = require("../../repositories/implementationsQuestions/mysqlGetAll");

const getAllQuestionsUseCase = async () => {
  const getAllQuestions = await mysqlGetAllQuestions();

  if (!getAllQuestions) throw('Not questions created yet, create one!');

  return getAllQuestions;
}

module.exports = { getAllQuestionsUseCase };
