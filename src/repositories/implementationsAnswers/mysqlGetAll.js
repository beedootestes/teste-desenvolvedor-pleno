const { Answers, Questions } = require("../sequelize/models");

const mysqlGetAllAnswers = async (id) => {
  const getAllAnswers = await Questions.findAll({
    where: { id },
    include: [{
      model: Answers, as: "Answers",
    }],
  });
  return getAllAnswers;
}

module.exports = { mysqlGetAllAnswers };
