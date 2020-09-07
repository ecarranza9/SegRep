const {Pedido,Pedidotecnico,Tecnico,Cierre} = require('../sequelize');

async function getAllPedidos(req,res){
    const user = req.user;
    const pedidos = await Pedido.findAll()
    const pedidosAsignados = await Pedidotecnico.findAll()
    const cierres = await Cierre.findAll()

    res.render('admin/reporte',{
        user:user,
        pedidos:pedidos,
        pedidosAsignados:pedidosAsignados,
        cierres:cierres
    })

}

async function getAdminAsignaciones(req,res){
    const user = req.user
    const pedidosAsignados = await Pedidotecnico.findAll()
    const pedidos = await Pedido.findAll({where:{estado:1}})

    res.render('admin/asignacionAdmin',{
        user:user,
        pedidos:pedidos,
        pedidosAsignados:pedidosAsignados
    })
}

async function deleteAdminAsignaciones(req,res){
    let asignacionId = req.params.id;
    try{
        const asignacion = await Pedidotecnico.findAll({where:{id:asignacionId}})
        const pedido = await Pedido.findByPk(asignacion[0].pedidoId)
        if(pedido){
            pedido.estado = 0
            pedido.save()
        } else{
            console.log("error")
        }
      let asignacionDelete =  await Pedidotecnico.destroy({where:{id:asignacionId}})
      if(asignacionDelete){
          res.json({text:'Operacion finalizada'})
      } else{
          res.json({text:'Operacion fallida'})
      }

       
}catch(err){
    console.log(err)
}
}


async function getAdminCierres(req,res){
    const user = req.user
    const cierres = await Cierre.findAll()
    const pedidos = await Pedido.findAll({where:{estado:2}})

    res.render('admin/cierresAdmin',{
        user:user,
        pedidos:pedidos,
        cierres:cierres
    })
}

async function deleteAdminCierres(req,res){
    let cierreId = req.params.id;
    try{
        const cierre = await Cierre.findAll({where:{id:cierreId}})
        console.log(cierre)
        const pedido = await Pedido.findByPk(cierre[0].pedidoId)
        if(pedido){
            pedido.estado = 1
            pedido.save()
        } else{
            console.log("error")
        }
      let cierreDelete =  await Cierre.destroy({where:{id:cierreId}})
      if(cierreDelete){
          res.json({text:'Operacion finalizada'})
      } else{
          res.json({text:'Operacion fallida'})
      }

       
}catch(err){
    console.log(err)
}
}

module.exports = {

    getAllPedidos,
    getAdminAsignaciones,
    deleteAdminAsignaciones,
    getAdminCierres,
    deleteAdminCierres

}