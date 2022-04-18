const Answer = (sequelize, DataTypes) => {
  const Answer = sequelize.define("Answer", {
    id: DataTypes.INTEGER,
    answer: DataTypes.STRING,
  });

  return Answer;
};

module.exports = Answer;
