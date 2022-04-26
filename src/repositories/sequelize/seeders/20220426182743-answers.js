'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Answers',
    [
      {
        answer: 'Tem entre 2 a 4 litros. São retirados 450 mililitros',
        questionId: 4
      },
      {
        answer: 'Tem entre 4 a 6 litros. São retirados 450 mililitros',
        questionId: 4
      },
      {
        answer: 'Descartes',
        questionId: 14
      },
      {
        answer: 'Platão',
        questionId: 14
      }
    ], { timestamps: false });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Answers', null, {});
  },
};
