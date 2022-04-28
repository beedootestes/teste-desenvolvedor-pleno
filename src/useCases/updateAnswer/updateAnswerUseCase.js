const { mysqlUpdateAnswer } = require("../../repositories/implementationsAnswers/mysqlUpdate");

const updateAnswerUseCase = async (id, answer) => {
  const updateAnswer = await mysqlUpdateAnswer(id, answer);
  return updateAnswer;
}

module.exports = { updateAnswerUseCase };
