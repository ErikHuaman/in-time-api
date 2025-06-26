'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'usuario',
      [
        {
          id: '66d82ceb-782c-41b6-b0ba-270a1bf535ed',
          orden: 1,
          nombre: 'Bruno',
          apellido: 'Alva',
          username: 'b.alva',
          idTipoDocID: '6e7469e8-8eb1-42c5-8dc3-d5d4c6cb0da6',
          identificacion: '00000000',
          password:
            '$2b$10$hkBQptXKl3unEXwQgPTTkODSF0KAmGysDismZ8FHnuzCbx94OZ3Qy',
          idRol: '8a381a9f-de6a-43f7-a20e-9476f55dca86',
          isActive: true,
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
