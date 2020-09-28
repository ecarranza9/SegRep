const {Pedido,Pedidotecnico,Tecnico,Cierre} = require('../sequelize');

async function getAllPedidos(req,res){
    const pedidos = await Pedido.findAll()
    const pedidosAsignados = await Pedidotecnico.findAll()
    const cierres = await Cierre.findAll()

    res.render('reporte',{
        pedidos:pedidos,
        pedidosAsignados:pedidosAsignados,
        cierres:cierres
    })

}



//mostrar pedidos
    async function getPedidos(req,res){
        const user = req.user
        const pedidos = await Pedido.findAll(
            {
                where:{estado:0},
                order:[['prioridad','ASC']]
            
            }
            
            );
        const asignacion = await Pedidotecnico.findAll();
        res.render('index', {
            user:user,
            pedidos:pedidos,
            asignacion:asignacion
        })
    
}

//agregar pedido
async function addPedido(req,res){
    Pedido.create({
        interno: req.body.interno,
        fecha_apertura: req.body.fecha_apertura,
        hora_apertura: req.body.hora_apertura,
        solicitud: req.body.solicitud,
        ubicacion_eqp: req.body.ubicacion_eqp,
        emisor: req.body.emisor,
        metodo_contacto: req.body.metodo_contacto,
        mail_solicitante: req.body.mail_solicitante,
        tel_solicitante: req.body.tel_solicitante,
        indicaciones: req.body.indicaciones,
        prioridad: req.body.prioridad,
        estado:req.body.estado,
        cierreId: req.body.cierreId
    }).then(pedido=>{
        req.flash('success_msg', 'Pedido Agregado al listado');
        res.redirect('/pedido');
    })
 
}

//borrar pedidos

async function borrarPedido(req,res){
    let pedidoId = req.params.id;
try{
Pedido.destroy({
    where: {id:pedidoId,estado:0}
}).then((pedido)=>{
    if(!pedido){
        req.flash('error_msg', 'No se puede borrar el pedido porque ya fue asignado');
        res.redirect('/pedido');
    }else{
    req.flash('success_msg', 'Pedido eliminado');
    res.redirect('/pedido');
}
})
}catch(err){
    console.log(err);
}


}

async function getEditarPedido(req,res){
    let pedidoId = req.params.id;
    const user = req.user
    Pedido.findByPk(pedidoId).then((pedido) => {
        if(pedido){
            res.render('editPedido',{
                id:pedidoId,
                user:user,
                pedido:pedido
            })
        }
        else{
            console.log('No se encuentra el pedido')
        }
    })
}

async function editarPedido(req,res){

    let pedidoId = req.params.id;
    let newdataPedido = req.body
    try{
        Pedido.findByPk(pedidoId)
        .then(pedido => {
            pedido.update(newdataPedido)
            .then((newdataPedido) => {
                if(newdataPedido){
                    req.flash('success_msg', 'Pedido actualizado');
                    res.redirect('/pedido');
                } 
            }
        )})

    }catch(err){
        console.log(err)
    }

}

async function getasignarPedido(req,res){
    const id = req.params.id
    const user = req.user
    Tecnico.findAll()
    .then(tecnicos=>{
    res.render('asignTecnicos',
    {id:id,
        user:user,
    tecnicos:tecnicos
    }
            )
    })
}

async function asignarPedido(req,res){
    const pedidoId = req.params.id
    const pedido = await Pedido.findByPk(pedidoId);

    var {tecnicoId, fecha_asignacion,hora_asignacion,fecha_ejecucion} = req.body
        if(req.body.tecnicoId.length === 1){
             tecnicoId = req.body.tecnicoId.split()
            }
try{
   let pedidoAsignado = await Pedidotecnico.create({
            pedidoId,
            tecnicoId,
            fecha_asignacion,
            hora_asignacion,
            fecha_ejecucion
   });

   if(pedidoAsignado){
       pedido.estado = 1;
       pedido.save()
       req.flash('success_msg', 'Pedido Asignado correctamente');
       res.redirect('/pedido') 
   }
} catch(err){
    console.log(err);
}   
}

async function getcerrarPedido(req,res){
    const id = req.params.id;
    const user = req.user;
    const pedido = await Pedido.findByPk(id);

    res.render('cierrePedido',{
        id:id,
        user:user,
        pedido:pedido
    })

}

async function cerrarPedido(req,res){
    const pedidoID = req.params.id;
    const pedido = await Pedido.findByPk(pedidoID);
    const {resolucion,tipo_averia,aprobacion,observaciones,reporte,fecha_cierre,hora_cierre} = req.body

    let newCierre = await Cierre.create({
            resolucion,
            tipo_averia,
            aprobacion,
            observaciones,
            reporte,
            fecha_cierre,
            hora_cierre,
            pedidoId: pedidoID
    },
    )

    if(newCierre){
       pedido.estado = 2
       pedido.save()
    console.log(newCierre)
    
    req.flash('success_msg', 'Pedido Cerrado');
       res.redirect('/pedido') 
    } else{
        res.send("Hubo un error")
    }

}






module.exports = {
    getPedidos,
    addPedido,
    borrarPedido,
    getEditarPedido,
    editarPedido,
    getasignarPedido,
    asignarPedido,
    getcerrarPedido,
    cerrarPedido,
    getAllPedidos
}