const { Answers } = require("../sequelize/models");

const mysqlCreateAnswers = async (answers) => {
  await answers.forEach(element => {
    const { answer, questionId } = element;
    Answers.create({ answer, questionId });
  });
}

module.exports = { mysqlCreateAnswers };
