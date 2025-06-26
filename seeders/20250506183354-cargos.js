'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'cargo',
      [
        {
          id: 'eefe3ba7-2cc5-4839-95d9-29ec45580f44',
          orden: 1,
          nombre: 'Descansero',
          isEditable: false,
          isDescansero: true,
          isActive: true,
          createdAt: new Date('2025-04-11T09:57:01.000Z'),
          updatedAt: new Date('2025-04-11T09:57:01.000Z'),
          deletedAt: null,
        },
        {
          id: '6c4a34a3-1028-4f19-80fc-d2b0e1ea031f',
          orden: 2,
          nombre: 'Portero',
          isEditable: true,
          isDescansero: false,
          isActive: true,
          createdAt: new Date('2025-04-11T09:57:01.000Z'),
          updatedAt: new Date('2025-04-11T09:57:01.000Z'),
          deletedAt: null,
        },
        {
          id: 'af4ca0a2-0204-4147-9094-9e09a21cc47f',
          orden: 3,
          nombre: 'Limpieza',
          isEditable: true,
          isDescansero: false,
          isActive: true,
          createdAt: new Date('2025-04-11T09:57:01.000Z'),
          updatedAt: new Date('2025-04-11T09:57:01.000Z'),
          deletedAt: null,
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
