'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tiempoContrato',
      [
        {
          id: 'a49c488f-94b3-4922-975c-e797b1b8a7e4',
          orden: 1,
          nombre: '1 mes',
          meses: 1,
          createdAt: new Date('2025-04-10T18:31:19.000Z'),
          updatedAt: new Date('2025-04-10T18:31:19.000Z'),
        },
        {
          id: '2672d70c-3e21-405f-a4e7-a5c00b8dd05f',
          orden: 2,
          nombre: '3 meses',
          meses: 3,
          createdAt: new Date('2025-04-10T18:31:19.000Z'),
          updatedAt: new Date('2025-04-10T18:31:19.000Z'),
        },
        {
          id: '2675740b-3892-4d72-b9c9-fa9a1d5fdc42',
          orden: 3,
          nombre: '6 meses',
          meses: 6,
          createdAt: new Date('2025-04-10T18:31:19.000Z'),
          updatedAt: new Date('2025-04-10T18:31:19.000Z'),
        },
        {
          id: 'd641e1c5-e314-4d99-83d4-42510816b84f',
          orden: 4,
          nombre: '12 meses',
          meses: 12,
          createdAt: new Date('2025-04-10T18:31:19.000Z'),
          updatedAt: new Date('2025-04-10T18:31:19.000Z'),
        },
        {
          id: '92dd9e76-49b6-4f6c-a535-0767e4c6c3d9',
          orden: 5,
          nombre: 'Indefinido',
          meses: null,
          createdAt: new Date('2025-04-10T18:31:19.000Z'),
          updatedAt: new Date('2025-04-10T18:31:19.000Z'),
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
