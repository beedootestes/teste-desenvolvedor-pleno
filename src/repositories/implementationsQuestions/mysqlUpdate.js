const { Questions } = require("../sequelize/models");

const mysqlUpdate = async (id, question) => {
  await Questions.update(
    { question }, { where: { id } },
  );
  return { id, question };
}

module.exports = { mysqlUpdate };
