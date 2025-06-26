'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'rol',
      [
        {
          id: '8a381a9f-de6a-43f7-a20e-9476f55dca86',
          orden: 1,
          codigo: 'super',
          nombre: 'Super Usuario',
          isActive: true,
          createdAt: new Date('2025-04-11T09:57:01.000Z'),
          updatedAt: new Date('2025-04-11T09:57:01.000Z'),
          deletedAt: null,
        },
        {
          id: 'b83d68fe-3820-4b79-a1cf-61d6ee836d3a',
          orden: 2,
          codigo: 'admin',
          nombre: 'Administrador',
          isActive: true,
          createdAt: new Date('2025-04-11T09:57:01.000Z'),
          updatedAt: new Date('2025-04-11T09:57:01.000Z'),
          deletedAt: null,
        },
        {
          id: 'e23cb877-53e3-4c34-b432-ca5e77897df5',
          orden: 3,
          codigo: 'supervisor',
          nombre: 'Supervisor',
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
