const { Questions } = require("../sequelize/models");

const mysqlGetAllQuestions = async () => {
  const getAllQuestions = await Questions.findAll();
  return getAllQuestions;
}

module.exports = { mysqlGetAllQuestions };
