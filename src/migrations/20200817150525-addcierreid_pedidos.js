'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('cierres','pedidoId',{
      type:Sequelize.INTEGER,
      references:{
        model:{
        tableName:'pedidos'},
        key:'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('cierres','pedidoId');
  }
};
