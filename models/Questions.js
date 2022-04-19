module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    }
  }, {
    timestamps: false,
    tableName: 'Questions'
  });

  Question.associate = (models) => {
    Question.hasmany(models.Answers, {
      foreignKey: 'id', as: 'Answer',
    });
  };

  return Question;
}