'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tecnico extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Tecnico.associate = function(models){
        Pedido.belongsToMany(models.Pedido,{
            through:'pedidotecnicos',
            foreignKey: 'pedidoId'
        })
    }
    
    }
  };
  Tecnico.init({
    nombre: DataTypes.TEXT,
    apellido: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'tecnico',
  });
  return Tecnico;
};