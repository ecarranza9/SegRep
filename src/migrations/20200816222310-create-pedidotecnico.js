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
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName: 'pedidos'
          },
          key: 'id'
        }
      },
      tecnicoId: {
        type: Sequelize.TEXT,
        references:{
          model:{
            tableName: 'tecnicos'
          },
          key: 'id'
        }
      },
      fecha_asignacion: {
        type: Sequelize.TEXT
      },
      hora_asignacion: {
        type: Sequelize.TEXT
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