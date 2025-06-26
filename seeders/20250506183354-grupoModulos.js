'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'grupoModulo',
      [
        {
          id: '2d9398f4-5db2-4282-82b3-b558073b11e3',
          orden: 1,
          nombre: 'Organización',
          isActive: true,
          createdAt: new Date('2025-04-11T09:57:01.000Z'),
          updatedAt: new Date('2025-04-11T09:57:01.000Z'),
          deletedAt: null,
        },
        {
          id: '0c9e5920-a534-45a7-ae58-0116f31b0a07',
          orden: 2,
          nombre: 'Asistencia',
          isActive: true,
          createdAt: new Date('2025-04-11T09:57:01.000Z'),
          updatedAt: new Date('2025-04-11T09:57:01.000Z'),
          deletedAt: null,
        },
        {
          id: 'e577f352-6877-47a1-91ff-f8aa95bd1acc',
          orden: 3,
          nombre: 'Planilla',
          isActive: true,
          createdAt: new Date('2025-04-11T09:57:01.000Z'),
          updatedAt: new Date('2025-04-11T09:57:01.000Z'),
          deletedAt: null,
        },
        {
          id: '9be3517f-d465-41b2-b740-f5eddab32905',
          orden: 4,
          nombre: 'Reporte',
          isActive: true,
          createdAt: new Date('2025-04-11T09:57:01.000Z'),
          updatedAt: new Date('2025-04-11T09:57:01.000Z'),
          deletedAt: null,
        },
        {
          id: 'f67bdd59-6e8c-4c13-8071-95b9db5908b4',
          orden: 5,
          nombre: 'Ajustes',
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
