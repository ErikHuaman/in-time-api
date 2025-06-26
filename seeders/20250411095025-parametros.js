'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'parametro',
      [
        {
          id: '73e0b461-dbd5-4692-befc-c8c9e1db2a07',
          orden: 1,
          ruc: '123456789',
          razonSocial: 'Corporación S.A.',
          rubro: 'Consultora tecnológica',
          direccion: 'Av. Perú 1000',
          porcentaje25: 0.25,
          porcentaje35: 0.35,
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
