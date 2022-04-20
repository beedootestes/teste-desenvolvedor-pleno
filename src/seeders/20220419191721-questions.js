'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Questions',
    [
      {
        question: 'Quem criou os personagens Mickey e Minnie Mouse?',
      },
      {
        question: 'Quem é o autor da série literária Sítio do Picapau Amarelo?',
      },
      {
        question: 'Quantos são os personagens principais do seriado norte-americano Friends?',
      },
    ], {});
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
