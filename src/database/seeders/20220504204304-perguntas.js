'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('perguntas', 
    [
      {
        pergunta: 'Quem Descobriu a América',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        pergunta: 'Quem Veio Primeiro, a Galinha ou o Ovo',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        pergunta: 'Qual a Raiz Quadrada de 81',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        pergunta: 'Quem atirou o pau no gato?',
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
