const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty')
const {Pedido,Tecnico,Pedidotecnico,Cierre} = require('../sequelize');
const multipartMiddleware = multipart({uploadDir:'./src/uploads'});
const fs = require('fs');
const path = require('path')


//Dashboard Pedidos
router.get('/', async (req,res)=>{
    const messages = [0]
    const pedidos = await Pedido.findAll(
        {
            where:{estado:0},
            order:[['prioridad','DESC']]
        
        }
        
        );
    const asignacion = await Pedidotecnico.findAll();

    res.render('index', {
        pedidos:pedidos,
        asignacion:asignacion
    })

})

//rutas pedidos

router.get('/pedido/nuevo', (req,res)=>{
    res.render('addPedido')
})

router.post('/pedido/nuevo', (req,res)=>{

    Pedido.create({
        interno: req.body.interno,
        fecha_apertura: req.body.fecha_apertura,
        hora_apertura: req.body.hora_apertura,
        solicitud: req.body.solicitud,
        ubicacion_eqp: req.body.ubicacion_eqp,
        emisor: req.body.emisor,
        metodo_contacto: req.body.metodo_contacto,
        indicaciones: req.body.indicaciones,
        prioridad: req.body.prioridad,
        estado:req.body.estado,
        cierreId: req.body.cierreId
    }).then(pedido=>{
        req.flash('success_msg', 'Pedido Agregado al listado');
        res.redirect('/');
    })
 
})

//borrar pedido

router.get('/pedido/:id', (req,res)=>{
let pedidoId = req.params.id;
try{
Pedido.destroy({
    where: {id:pedidoId,estado:0}
}).then((pedido)=>{
    if(!pedido){
        req.flash('success_msg', 'No se puede borrar el pedido porque ya fue asignado');
        res.redirect('/');
    }else{
    req.flash('success_msg', 'Pedido eliminado');
    res.redirect('/');
}
})
}catch(err){
    console.log(err);
}


})

//editar pedido

router.get('/pedido/edit/:id', (req,res)=> {
    let pedidoId = req.params.id;
    Pedido.findByPk(pedidoId).then((pedido) => {
        if(pedido){
            res.render('editPedido',{
                id:pedidoId,
                pedido:pedido
            })
        }
        else{
            console.log('No se encuentra el pedido')
        }
    })
})

router.post('/pedido/edit/:id',(req,res) => {
    let pedidoId = req.params.id;
    let newdataPedido = req.body
    try{
        Pedido.findByPk(pedidoId)
        .then(pedido => {
            pedido.update(newdataPedido)
            .then((newdataPedido) => {
                if(newdataPedido){
                    req.flash('success_msg', 'Pedido actualizado');
                    res.redirect('/');
                } 
            }
        )})

    }catch(err){
        console.log(err)
    }
})

//Rutas tecnicos
//consultar todos los tecnicos
router.get('/tecnico', (req,res)=>{

    const messages = 0;

    Tecnico.findAll()
    .then(tecnicos => {
        res.render('tecnicos',{
            messages:messages,
            tecnicos:tecnicos
        })
    })

 
})
//nuevo tecnico
router.post('/tecnico/nuevo', (req,res)=>{
    Tecnico.create({
       nombre: req.body.nombre,
       apellido: req.body.apellido
    }).then(tecnico =>{
        req.flash('success_msg', 'Se ha agregado un tecnico al listado');
        res.redirect('/tecnico') 
      
    })
 
})

//eliminar tecnico

router.get('/tecnico/:id', (req,res)=>{
    let tecnicoId = req.params.id;
    try{
    Tecnico.destroy({
        where: {id:tecnicoId}
    }).then(()=>{
        req.flash('success_msg', 'Tecnico Eliminado'); 
        res.redirect('/');
    })
    }catch(err){
        console.log(err);
    }
    
    
    })





//asignacion de pedido

router.get('/asignacion', async (req, res)=>{
    const pedidos = await Pedido.findAll({where:{estado:1}});
    res.render('asignacion',{
        pedidos:pedidos
    })


})

router.get('/asignacion/:id', async(req,res)=>{

    const id = req.params.id
    const pedido = await Pedido.findAll({where:{id:id}})
    const pedidoAsignado = await Pedidotecnico.findAll({where:{pedidoId:id}})
    const tecnicos = await Tecnico.findAll()

    res.render('detalleTecnicos',{
        pedido:pedido,
        pedidoAsignado:pedidoAsignado,
        tecnicos:tecnicos
    })



})



router.get('/pedido/asignar/:id', (req,res)=>{
    const id = req.params.id
    Tecnico.findAll()
    .then(tecnicos=>{
    res.render('asignTecnicos',
    {id:id,
    tecnicos:tecnicos
    }
    )
    })

})


router.post('/pedido/asignar/:id', async(req,res)=>{

    const pedidoId = req.params.id
    const pedido = await Pedido.findByPk(pedidoId);

    const {tecnicoId, fecha_asignacion,fecha_ejecucion} = req.body
try{
   let pedidoAsignado = Pedidotecnico.create({
            pedidoId,
            tecnicoId,
            fecha_asignacion,
            fecha_ejecucion
   });

   if(pedidoAsignado){
       pedido.estado = 1;
       pedido.save()
       req.flash('success_msg', 'Pedido Asignado correctamente');
       res.redirect('/') 
   }
} catch(err){
    console.log(err);
}   
})


router.get('/pedido/cierre/:id',async (req,res)=>{

    const id = req.params.id;
    const pedido = await Pedido.findByPk(id);

    res.render('cierrePedido',{
        id:id,
        pedido:pedido
    })
})

router.post('/pedido/cierre/:id',async (req,res)=>{
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
       res.redirect('/') 
    } else{
        res.send("Hubo un error")
    }

})

router.post('/cierres/upload/:id', multipartMiddleware, function(req, res){
    var cierreId = req.params.id;

    if(req.files){
        var filePath = req.files.reporte.path;
        var fileSplit = filePath.split('\\uploads\\');
        var fileName = fileSplit[1];


        Cierre.findByPk(cierreId)
        .then((cierre=>{
            console.log(cierre.reporte)
            cierre.reporte = fileName
            cierre.save()
           
        }))

        req.flash('success_msg', 'Reporte Agregado con exito');
        res.redirect('/cierres')
    }else{
        return res.status(200).send({
            message: fileName
        })
    }
})

router.get('/cierres/upload/:reporte', function(req,res){
    var file = req.params.reporte
    var path_file = './src/uploads/' + file;
    fs.exists(path_file, (exists)=>{
        if(exists){
            return res.sendFile(path.resolve(path_file))
        }else{
            return res.status(200).send({
                message:'No existe la imagen'
            })
        }
    })


})

//cierres de pedidoId
router.get('/cierres', async (req, res)=>{
    const pedidos = await Pedido.findAll({where:{estado:2}});
    res.render('cierres',{
        pedidos:pedidos,
    })
})


router.get('/cierres/detalle/:id', async (req,res)=>{
    let pedidoId = req.params.id
    const pedido = await Pedido.findAll({where:{id:pedidoId}})
    const cierres = await Cierre.findAll({where:{pedidoId:pedidoId}})
    const pedidoAsignado = await Pedidotecnico.findAll({where:{pedidoId:pedidoId}})
    const tecnicos = await Tecnico.findAll()
    res.render('detalleCierre', {
        cierres: cierres,
        pedidoAsignado:pedidoAsignado,
        tecnicos:tecnicos,
        pedido:pedido
    })
})


module.exports = router
