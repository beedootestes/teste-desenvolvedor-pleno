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

  Answer.associate = (models) => {
    Answer.belongsTo(models.Questions, {
      foreignKey: 'id', as: 'Question',
    });
  };

  return Answer;
};