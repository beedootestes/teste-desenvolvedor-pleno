'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => queryInterface.bulkInsert('Questions',
    [
      { question: "In what type of matter are atoms most tightly packed?" },
      { question: "What is the nearest planet to the sun?" },
      { question: "What is the hottest planet in the solar system?" },
      { question: "What is the opposite of matter?" } 
    ], {}),

  down: async (queryInterface, _Sequelize) => queryInterface.bulkDelete('Questions', null, {}),
};
