'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Answers',
    [
      {
        answer: 'Tem entre 2 a 4 litros. São retirados 450 mililitros',
        questionId: 1
      },
      {
        answer: 'Tem entre 4 a 6 litros. São retirados 450 mililitros?',
        questionId: 1
      },
      {
        answer: 'Descartes',
        questionId: 2
      },
      {
        answer: 'Platão',
        questionId: 2
      }
    ], { timestamps: false });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Answers', null, {});
  },
};
