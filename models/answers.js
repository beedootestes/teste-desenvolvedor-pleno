const Answer = (sequelize, DataTypes) => {
  const Answer = sequelize.define("Answer", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    answer: { type: DataTypes.STRING },
  },
    { timestamps: false });

  return Answer;
};

module.exports = Answer;
