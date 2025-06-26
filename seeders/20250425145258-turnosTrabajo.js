'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'turnoTrabajo',
      [
        {
          id: 'cd10eaf8-5491-48a5-82ac-8ea4adf2af91',
          orden: 1,
          nombre: 'Turno día',
          codigo: 'TD',
          createdAt: new Date('2025-04-25T14:54:06.000Z'),
          updatedAt: new Date('2025-04-25T14:54:06.000Z'),
        },
        {
          id: 'fce9827f-cf0a-41aa-b5f7-a25056359ef8',
          orden: 2,
          nombre: 'Turno noche',
          codigo: 'TN',
          createdAt: new Date('2025-04-25T14:54:06.000Z'),
          updatedAt: new Date('2025-04-25T14:54:06.000Z'),
        },
        {
          id: '1818b159-ea59-4401-8e00-e819aa77eee7',
          orden: 3,
          nombre: 'Turno doble',
          codigo: '2T',
          createdAt: new Date('2025-04-25T14:54:06.000Z'),
          updatedAt: new Date('2025-04-25T14:54:06.000Z'),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
