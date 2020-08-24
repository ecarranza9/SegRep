const Sequelize = require('sequelize')

const PedidoModel = require('./models/Pedido');
const TecnicoModel = require('./models/Tecnico');
const CierreModel = require('./models/Cierre')
const PedidotecnicoModel = require('./models/Pedidotecnico');

const sequelize = new Sequelize({
    dialect:'sqlite',
    storage: './proyectomil'
})

const Pedido = PedidoModel(sequelize,Sequelize);
const Tecnico = TecnicoModel(sequelize,Sequelize);
const Pedidotecnico = PedidotecnicoModel(sequelize,Sequelize);
const Cierre = CierreModel(sequelize,Sequelize);
/*
sequelize.sync({force:true})
.then(()=>{
    console.log('Tablas creadas')
})
*/

module.exports = {
    Pedido,
    Tecnico,
    Cierre,
    Pedidotecnico
    

}