const Question = (sequelize, DataTypes) => {
  const Question = sequelize.define("Question", {
    id: DataTypes.INTEGER,
    question: DataTypes.STRING,
  });

  return Question;
};

module.exports = Question;
