'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'frecuenciaPago',
      [
        {
          id: '2b03a276-1836-417f-997e-096e6dcad284',
          orden: 1,
          nombre: 'Diario',
          createdAt: new Date('2025-04-10T18:43:27.000Z'),
          updatedAt: new Date('2025-04-10T18:43:27.000Z'),
        },
        {
          id: '08b15eec-1ed1-42c3-8033-9e003140bc4f',
          orden: 2,
          nombre: 'Semanal',
          createdAt: new Date('2025-04-10T18:43:27.000Z'),
          updatedAt: new Date('2025-04-10T18:43:27.000Z'),
        },
        {
          id: '4601ace6-9198-4b05-acb1-4470c2076307',
          orden: 3,
          nombre: 'Quincenal',
          createdAt: new Date('2025-04-10T18:43:27.000Z'),
          updatedAt: new Date('2025-04-10T18:43:27.000Z'),
        },
        {
          id: 'baddef92-2075-4189-ba7e-b9b758203ee3',
          orden: 4,
          nombre: 'Mensual',
          createdAt: new Date('2025-04-10T18:43:27.000Z'),
          updatedAt: new Date('2025-04-10T18:43:27.000Z'),
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
