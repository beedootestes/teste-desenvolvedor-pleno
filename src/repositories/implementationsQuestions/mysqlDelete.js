const { Questions } = require("../sequelize/models");

const mysqlDeleteQuestion = async (id) => {
  await Questions.destroy({ where: { id } });
}

module.exports = { mysqlDeleteQuestion };
