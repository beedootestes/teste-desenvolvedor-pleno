const { Answers } = require("../sequelize/models");

const mysqlDeleteAnswer = async (id) => {
  await Answers.destroy({ where: { id } });
}

module.exports = { mysqlDeleteAnswer };
