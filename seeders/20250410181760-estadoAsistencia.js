'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'estadoAsistencia',
      [
        {
          id: '5d980afe-27d9-4e14-b23b-9f5365d5fb2f',
          orden: 1,
          nombre: 'TURNO DÍA',
          codigo: 'TD',
          bgColor: '#ffe699',
          textColor: '#0a0a0a',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 'd7031121-41aa-4fcb-b4ae-e2e8c9ff8853',
          orden: 2,
          nombre: 'TURNO NOCHE',
          codigo: 'TN',
          bgColor: '#595959',
          textColor: '#ffffe5',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: '24773825-c642-41ca-b90a-730935e51fad',
          orden: 3,
          nombre: 'DOBLE TURNO (24HR)',
          codigo: '2T',
          bgColor: '#ffd966',
          textColor: '#0a0a0a',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: '882fc69e-7ed4-45d8-863d-f1cd01f72d5c',
          orden: 4,
          nombre: 'DESCANSERO',
          codigo: 'D',
          bgColor: '#8ea9db',
          textColor: '#0a0a0a',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: '5f9d232b-642e-416a-838f-e1bf349decac',
          orden: 5,
          nombre: 'VACACIONES',
          codigo: 'V',
          bgColor: '#92d050',
          textColor: '#0a0a0a',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: '9c1d680e-fd44-4fd7-b0f2-b4c20785e200',
          orden: 6,
          nombre: 'FALTA',
          codigo: 'F',
          bgColor: '#ff0000',
          textColor: '#0a0a0a',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 'e4bb9380-02e9-4119-a593-043cc8bc1027',
          orden: 7,
          nombre: 'PERMISO',
          codigo: 'P',
          bgColor: '#ffff00',
          textColor: '#0a0a0a',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: '80ea3f31-080f-4a31-a34b-f26559d8ddbc',
          orden: 8,
          nombre: 'SUSPENDIDO',
          codigo: 'S',
          bgColor: '#7030a0',
          textColor: '#ffffe5',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
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
