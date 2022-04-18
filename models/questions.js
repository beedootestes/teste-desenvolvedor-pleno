const Question = (sequelize, DataTypes) => {
  const Question = sequelize.define("Question", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    question: { type : DataTypes.STRING },
  },
  { timestamps: false });

  return Question;
};

module.exports = Question;
