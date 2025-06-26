'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tipoTurno',
      [
        {
          id: 'fe7e474c-aef9-4e97-b209-e0016e602f77',
          orden: 1,
          nombre: 'Turno contínuo',
          nombreCorto: 'contínuo',
          numBloques: 1,
          isActive: true,
          createdAt: new Date('2025-04-11T09:57:01.000Z'),
          updatedAt: new Date('2025-04-11T09:57:01.000Z'),
        },
        {
          id: '936b831d-d21d-41e5-b9de-991664b3256f',
          orden: 2,
          nombre: 'Turno con 1 descanso',
          nombreCorto: '1 descanso',
          numBloques: 2,
          isActive: false,
          createdAt: new Date('2025-04-11T09:57:01.000Z'),
          updatedAt: new Date('2025-04-11T09:57:01.000Z'),
        },
        {
          id: 'bfb63769-e6fb-410d-ab36-4ef5792cbced',
          orden: 3,
          nombre: 'Turno con 2 descansos',
          nombreCorto: '2 descansos',
          numBloques: 3,
          isActive: false,
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
