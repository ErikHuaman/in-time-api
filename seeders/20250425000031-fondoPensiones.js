'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'fondoPensiones',
      [
        {
          id: '8def3bd8-710b-4122-b55e-1225dd025661',
          nombre: 'NO APLICA',
          seguro: 0,
          pension: 0,
          comision: 0,
          esFijo: false,
          orden: 0,
          createdAt: new Date('2025-04-11T09:57:01.000Z'),
          updatedAt: new Date('2025-04-11T09:57:01.000Z'),
        },
        {
          id: '37faf65a-497a-41d1-ad6e-3cc58e9e878d',
          orden: 1,
          nombre: 'AFP PROFUTURO',
          seguro: 0.0137,
          pension: 0.1,
          comision: 0.0169,
          esFijo: false,
          createdAt: new Date('2025-04-11T09:57:01.000Z'),
          updatedAt: new Date('2025-04-11T09:57:01.000Z'),
        },
        {
          id: 'd44ed763-b043-4862-aa7b-8fff3b564640',
          orden: 2,
          nombre: 'AFP INTEGRA',
          seguro: 0.0137,
          pension: 0.1,
          comision: 0.0155,
          esFijo: false,
          createdAt: new Date('2025-04-11T09:57:01.000Z'),
          updatedAt: new Date('2025-04-11T09:57:01.000Z'),
        },
        {
          id: '958c44f7-0286-40b0-ab63-cc93579412fc',
          orden: 3,
          nombre: 'AFP HABITAD',
          seguro: 0.0137,
          pension: 0.1,
          comision: 0.0147,
          esFijo: false,
          createdAt: new Date('2025-04-11T09:57:01.000Z'),
          updatedAt: new Date('2025-04-11T09:57:01.000Z'),
        },
        {
          id: 'cb935f22-26be-42eb-af4b-3ed4c2c5b977',
          orden: 4,
          nombre: 'AFP PRIMA',
          seguro: 0.0137,
          pension: 0.1,
          comision: 0.016,
          esFijo: false,
          createdAt: new Date('2025-04-11T09:57:01.000Z'),
          updatedAt: new Date('2025-04-11T09:57:01.000Z'),
        },
        {
          id: '2cbd183b-28d8-4dcf-9d04-69b7af09d1fa',
          orden: 5,
          nombre: 'ONP',
          seguro: 0.13,
          pension: 0,
          comision: 0,
          esFijo: true,
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
