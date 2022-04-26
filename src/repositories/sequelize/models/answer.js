'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    answer: {
      allowNull: false,
      type: DataTypes.STRING
    },
    questionId: {
      foreignKey: true,
      type: DataTypes.INTEGER
    },
  }, {
    timestamps: false,
    tableName: 'Answers'
  });

  Answer.associate = (models) => {
    Answer.belongsTo(models.Questions, {
      foreignKey: 'id', as: 'question',
    });
  };

  return Answer;
};
