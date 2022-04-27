const { mysqlGetAllQuestions } = require("../../repositories/implementationsQuestions/mysqlGetAllQuestions");

const getAllQuestionsUseCase = async () => {
  const getAllQuestions = await mysqlGetAllQuestions();
  return getAllQuestions;
}

module.exports = { getAllQuestionsUseCase };
