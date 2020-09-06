'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Usuario.init({
    username:
     { type: DataTypes.TEXT,
        unique: true,
        allowNull: true
    },
    password: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'usuario',
  });

  return Usuario;
};

