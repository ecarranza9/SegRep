'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cierres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      resolucion: {
        type: Sequelize.TEXT
      },
      tipo_averia: {
        type: Sequelize.TEXT
      },
      aprobacion: {
        type: Sequelize.TEXT
      },
      observaciones: {
        type: Sequelize.TEXT
      },
      fecha_cierre: {
        type: Sequelize.TEXT
      },
      hora_cierre: {
        type: Sequelize.TEXT
      },
      reporte: {
        type: Sequelize.BLOB
      },
      ticket_firmado: {
        type: Sequelize.BLOB
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cierres');
  }
};