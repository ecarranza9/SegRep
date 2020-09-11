const Sequelize = require('sequelize')
const UsuarioModel = require('./models/Usuario')
const PedidoModel = require('./models/Pedido');
const TecnicoModel = require('./models/Tecnico');
const CierreModel = require('./models/Cierre')
const PedidotecnicoModel = require('./models/Pedidotecnico');



if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.DATABASE_URL, {
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