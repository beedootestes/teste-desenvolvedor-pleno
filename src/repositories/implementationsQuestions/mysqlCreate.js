const { Questions } = require("../sequelize/models");

const mysqlCreateQuestion = async (question) => {
  const createQuestion = await Questions.create({ question });
  return createQuestion;
}

module.exports = { mysqlCreateQuestion };
