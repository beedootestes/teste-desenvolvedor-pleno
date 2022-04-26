'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Questions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    question: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    tableName: 'Questions',
    timestamps: false
  });

  Question.associate = (models) => {
    Question.hasMany(models.Answers, {
      foreignKey: 'questionId', as: 'answer',
    });
  };

  return Question;
};
