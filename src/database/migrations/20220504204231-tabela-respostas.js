'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('respostas', 
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      resposta:{
        type: Sequelize.STRING,
        allowNull: false
      },
      resposta_valida:{
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      pergunta_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'perguntas',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('resposta');
  }
};
