'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'seguroSalud',
      [
        {
          id: 'a5b99adb-920f-4336-9312-4ceab4b998eb',
          orden: 1,
          nombre: 'SIS',
          esFijo: true,
          valor: 15,
          createdAt: new Date('2025-04-11T09:57:01.000Z'),
          updatedAt: new Date('2025-04-11T09:57:01.000Z'),
        },
        {
          id: '811ed1a9-0120-4388-bc37-0abd00cc5a87',
          orden: 2,
          nombre: 'SCTR',
          esFijo: false,
          valor: 0.0063,
          createdAt: new Date('2025-04-11T09:57:01.000Z'),
          updatedAt: new Date('2025-04-11T09:57:01.000Z'),
        },
        {
          id: '75d99261-ec7e-41eb-90d1-ff06f1c92ad6',
          orden: 3,
          nombre: 'ESSALUD',
          esFijo: false,
          valor: 0.09,
          createdAt: new Date('2025-04-11T09:57:01.000Z'),
          updatedAt: new Date('2025-04-11T09:57:01.000Z'),
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
