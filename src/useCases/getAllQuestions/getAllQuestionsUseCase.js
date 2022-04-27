const { mysqlGetAllQuestions } = require("../../repositories/implementationsQuestions/mysqlGetAll");

const getAllQuestionsUseCase = async () => {
  const getAllQuestions = await mysqlGetAllQuestions();
  return getAllQuestions;
}

module.exports = { getAllQuestionsUseCase };
