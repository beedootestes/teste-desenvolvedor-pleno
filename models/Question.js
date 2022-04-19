module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Questions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    timestamps: false,
    tableName: 'Questions'
  });

  Question.associate = (models) => {
    Question.hasMany(models.Answers, {
      foreignKey: 'questionId', as: 'Answer',
    });
  };

  return Question;
}