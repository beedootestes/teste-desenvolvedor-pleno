'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Question, { foreignKey: 'questionId', as: 'answersquestions' });
    }
  };
  Answer.init({
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};