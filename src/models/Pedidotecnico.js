'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedidotecnico extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Pedidotecnico.init({
    pedidoId: DataTypes.INTEGER,
    tecnicoId: DataTypes.ARRAY(DataTypes.TEXT),
    fecha_asignacion: DataTypes.TEXT,
    hora_asignacion: DataTypes.TEXT,
    fecha_ejecucion: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'pedidotecnico',
  });
  return Pedidotecnico;
};