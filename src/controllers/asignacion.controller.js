const {Pedido,Tecnico,Pedidotecnico,Cierre} = require('../sequelize');

async function getAsignacion(req,res){
    const pedidos = await Pedido.findAll({where:{estado:1}});
    res.render('asignacion',{
        pedidos:pedidos
    })
}

async function asignacionData(req,res){
    const id = req.params.id
    const pedido = await Pedido.findAll({where:{id:id}})
    const pedidoAsignado = await Pedidotecnico.findAll({where:{pedidoId:id}})
    const tecnicos = await Tecnico.findAll()

    res.render('detalleTecnicos',{
        pedido:pedido,
        pedidoAsignado:pedidoAsignado,
        tecnicos:tecnicos
    })
}


module.exports = {
    getAsignacion,
    asignacionData
}