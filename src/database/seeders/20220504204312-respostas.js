'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('respostas', 
    [
      {
        resposta: 'Joaozinho',
        resposta_valida: false,
        pergunta_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        resposta: 'Napoleão',
        resposta_valida: false,
        pergunta_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        resposta: 'Lampião',
        resposta_valida: false,
        pergunta_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        resposta: 'Pedro Alvares Cabral',
        resposta_valida: true,
        pergunta_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        resposta: 'Galinha',
        resposta_valida: false,
        pergunta_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        resposta: 'Ovo',
        resposta_valida: false,
        pergunta_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        resposta: 'Eu',
        resposta_valida: false,
        pergunta_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        resposta: 'Você',
        resposta_valida: false,
        pergunta_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        resposta: 'N.D.A',
        resposta_valida: true,
        pergunta_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        resposta: '4',
        resposta_valida: false,
        pergunta_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        resposta: '2',
        resposta_valida: false,
        pergunta_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        resposta: '1',
        resposta_valida: false,
        pergunta_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        resposta: '3',
        resposta_valida: true,
        pergunta_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        resposta: 'Não sei',
        resposta_valida: false,
        pergunta_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        resposta: 'O Vizinho',
        resposta_valida: false,
        pergunta_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        resposta: 'Joãozinho',
        resposta_valida: false,
        pergunta_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        resposta: 'O Locutor',
        resposta_valida: true,
        pergunta_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        resposta: 'Não vi',
        resposta_valida: false,
        pergunta_id: 4,
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
