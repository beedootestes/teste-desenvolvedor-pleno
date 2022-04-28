const { Answers } = require("../sequelize/models");

const mysqlUpdateAnswer = async (id, answer) => {
  await Answers.update(
    { answer }, { where: { id } },
  );
  return { id, answer };
}

module.exports = { mysqlUpdateAnswer };
