module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'Answers'
  });

  return Answer;
};