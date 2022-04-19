'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Answers',
    [
      {
        answer: 'O empresário norte-americano Walt Disney.',
        questionId: 1,
      },
      {
        answer: 'O ator norte-americano john travolta.',
        questionId: 1,
      },
      {
        answer: 'O escritor Monteiro Lobato.',
        questionId: 2,
      },
      {
        answer: 'Dez',
        questionId: 3,
      },
      {
        answer: 'Vinte',
        questionId: 3,
      },
      {
        answer: 'Seis',
        questionId: 3,
      },
    ], {});
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('Answers', null, {});
  }
};
