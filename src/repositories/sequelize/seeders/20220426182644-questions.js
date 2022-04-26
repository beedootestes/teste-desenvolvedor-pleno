'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Questions',
    [
      { question: 'Normalmente, quantos litros de sangue uma pessoa tem?' },
      { question: 'De quem é a famosa frase “Penso, logo existo”?' }
    ], { timestamps: false });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {});
  },
};
