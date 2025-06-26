'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'estadoCivil',
      [
        {
          id: '3838db21-9655-4b26-a227-82fbe0050bc4',
          orden: 1,
          nombre: 'Soltero',
          createdAt: new Date('2025-04-10T22:55:22.000Z'),
          updatedAt: new Date('2025-04-10T22:55:22.000Z'),
        },
        {
          id: '9cf4a4f1-9980-433c-a032-b84dd23b3eb0',
          orden: 2,
          nombre: 'Casado',
          createdAt: new Date('2025-04-10T22:55:22.000Z'),
          updatedAt: new Date('2025-04-10T22:55:22.000Z'),
        },
        {
          id: '6382e129-d37d-4e0b-b367-ad931f5649a0',
          orden: 3,
          nombre: 'Divorciado',
          createdAt: new Date('2025-04-10T22:55:22.000Z'),
          updatedAt: new Date('2025-04-10T22:55:22.000Z'),
        },
        {
          id: '15fbe4d8-b85a-4d08-8b3b-c78987712b40',
          orden: 4,
          nombre: 'Viudo',
          createdAt: new Date('2025-04-10T22:55:22.000Z'),
          updatedAt: new Date('2025-04-10T22:55:22.000Z'),
        },
        {
          id: 'e67a75e4-baf5-4f81-9d89-bc6a7e4e733f',
          orden: 5,
          nombre: 'Conviviente',
          createdAt: new Date('2025-04-10T22:55:22.000Z'),
          updatedAt: new Date('2025-04-10T22:55:22.000Z'),
        },
        {
          id: '43a50a6d-f1e1-46b5-9fee-69dbd8ceab13',
          orden: 6,
          nombre: 'Separado',
          createdAt: new Date('2025-04-10T22:55:22.000Z'),
          updatedAt: new Date('2025-04-10T22:55:22.000Z'),
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
