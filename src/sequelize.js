const Sequelize = require('sequelize')
const UsuarioModel = require('./models/Usuario')
const PedidoModel = require('./models/Pedido');
const TecnicoModel = require('./models/Tecnico');
const CierreModel = require('./models/Cierre')
const PedidotecnicoModel = require('./models/Pedidotecnico');
const config_db = require('./config/config.json')
sequelize = new Sequelize(config_db.production);


if (process.env.PORT === 3000) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize({
      dialect:'sqlite',
      storage: './proyectomil'
  })
}


const Pedido = PedidoModel(sequelize,Sequelize);
const Tecnico = TecnicoModel(sequelize,Sequelize);
const Pedidotecnico = PedidotecnicoModel(sequelize,Sequelize);
const Cierre = CierreModel(sequelize,Sequelize);
const Usuario = UsuarioModel(sequelize,Sequelize);

/*
sequelize.sync({force:true})
.then(()=>{
    console.log("Tablas creadas")
})
*/

console.log(sequelize.options)


module.exports = {
    Usuario,
    Pedido,
    Tecnico,
    Cierre,
    Pedidotecnico
    

}