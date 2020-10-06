const Sequelize = require('sequelize')
const UsuarioModel = require('./models/Usuario')
const PedidoModel = require('./models/Pedido');
const TecnicoModel = require('./models/Tecnico');
const CierreModel = require('./models/Cierre')
const PedidotecnicoModel = require('./models/Pedidotecnico');

console.log(process.env.NODE_ENV)


if (process.env.NODE_ENV === 'production') {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize({
      dialect:  'postgres',
      protocol: 'postgres',
      logging:  true //false
    });
  } else {
    // the application is executed on the local machine
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


sequelize.sync({force:true})
.then(()=>{
    console.log("Tablas creadas")
})



module.exports = {
    Usuario,
    Pedido,
    Tecnico,
    Cierre,
    Pedidotecnico
    

}