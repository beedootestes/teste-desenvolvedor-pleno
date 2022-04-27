const { mysqlGetQuestion } = require("../../repositories/implementationsQuestions/mysqlGet");

const getQuestionUseCase = async (id) => {
  const getQuestion = await mysqlGetQuestion(id);

  if (!getQuestion) throw('This question does not exists.')

  return getQuestion;
}

module.exports = { getQuestionUseCase };
