const {Pedido,Pedidotecnico,Tecnico,Cierre} = require('../sequelize');

async function getAllPedidos(req,res){
    const user = req.user;
    const pedidos = await Pedido.findAll()
    const pedidosAsignados = await Pedidotecnico.findAll()
    const cierres = await Cierre.findAll()

    res.render('reporte',{
        user:user,
        pedidos:pedidos,
        pedidosAsignados:pedidosAsignados,
        cierres:cierres
    })

}



module.exports = {

    getAllPedidos

}