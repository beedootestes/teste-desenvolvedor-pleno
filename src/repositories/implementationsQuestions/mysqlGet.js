const { Questions } = require("../sequelize/models");

const mysqlGetQuestion = async (id) => {
  const getQuestion = await Questions.findByPk(id);
  return getQuestion;
}

module.exports = { mysqlGetQuestion };
