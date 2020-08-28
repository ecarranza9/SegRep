const {Pedido,Tecnico,Pedidotecnico,Cierre} = require('../sequelize');

async function getAsignacion(req,res){
    const pedidos = await Pedido.findAll({where:{estado:1}});
    const user = req.user
    res.render('asignacion',{
        user:user,
        pedidos:pedidos
    })
}

async function asignacionData(req,res){
    const id = req.params.id;
    const user = req.user;
    const pedido = await Pedido.findAll({where:{id:id}})
    const pedidoAsignado = await Pedidotecnico.findAll({where:{pedidoId:id}})
    const tecnicos = await Tecnico.findAll()

    res.render('detalleTecnicos',{
        pedido:pedido,
        user:user,
        pedidoAsignado:pedidoAsignado,
        tecnicos:tecnicos
    })
}


module.exports = {
    getAsignacion,
    asignacionData
}