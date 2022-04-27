const { mysqlDeleteAnswer } = require("../../repositories/implementationsAnswers/mysqlDelete");

const deleteAnswerUseCase = async (id) => {
  await mysqlDeleteAnswer(id);
}

module.exports = { deleteAnswerUseCase };
