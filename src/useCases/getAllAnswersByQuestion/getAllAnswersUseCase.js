const { mysqlGetAllAnswers } = require("../../repositories/implementationsAnswers/mysqlGetAll");

const getAllAnswersUseCase = async (id) => {
  const getAllAnswers = await mysqlGetAllAnswers(id);

  if (!getAllAnswers) throw('Not questions created yet, create one!');

  return getAllAnswers;
}

module.exports = { getAllAnswersUseCase };
