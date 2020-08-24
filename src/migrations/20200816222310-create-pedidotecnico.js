'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pedidotecnicos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pedidoId: {
        type: Sequelize.INTEGER
      },
      tecnicoId: {
        type: Sequelize.INTEGER
      },
      fecha_asignacion: {
        type: Sequelize.TEXT
      },
      hora_asignacion: {
        type: Sequelize.INTEGER
      },
      fecha_ejecucion: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('pedidotecnicos');
  }
};