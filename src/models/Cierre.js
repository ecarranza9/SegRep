'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cierre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Cierre.belongsTo(models.Pedido,{
       as:'pedidos'
     })
    }
  };
  Cierre.init({
    resolucion: DataTypes.TEXT,
    tipo_averia: DataTypes.TEXT,
    aprobacion: DataTypes.TEXT,
    observaciones: DataTypes.TEXT,
    fecha_cierre: DataTypes.TEXT,
    hora_cierre: DataTypes.TEXT,
    reporte: DataTypes.BLOB,
    ticket_firmado: DataTypes.BLOB,
    pedidoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cierre',
  });
  return Cierre;
};