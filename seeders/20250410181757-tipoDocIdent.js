'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tipoDocIdent',
      [
        {
          id: '6e7469e8-8eb1-42c5-8dc3-d5d4c6cb0da6',
          orden: 1,
          nombre: 'DNI',
          createdAt: new Date('2025-04-10T18:31:19.000Z'),
          updatedAt: new Date('2025-04-10T18:31:19.000Z'),
        },
        {
          id: '4e3d1a4e-f325-478b-94b0-aeea2e47a171',
          orden: 2,
          nombre: 'C. E.',
          createdAt: new Date('2025-04-10T18:31:19.000Z'),
          updatedAt: new Date('2025-04-10T18:31:19.000Z'),
        },
        {
          id: 'b2b13e44-cb03-4ca1-9584-1d2277ed0dec',
          orden: 3,
          nombre: 'CPP',
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
