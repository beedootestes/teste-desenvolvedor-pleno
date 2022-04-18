'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => queryInterface.bulkInsert('Answers',
    [
      { answer: "Solids" },
      { answer: "Mercury" },
      { answer: "Venus" },
      { answer: "Antimatter" }
    ], {}),

  down: async (queryInterface, _Sequelize) => queryInterface.bulkDelete('Answers', null, {}),
};
