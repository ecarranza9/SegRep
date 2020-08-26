const {Pedido,Tecnico,Pedidotecnico,Cierre} = require('../sequelize');



async function getTecnico(req,res){
    const messages = 0;
    Tecnico.findAll()
    .then(tecnicos => {
        res.render('tecnicos',{
            messages:messages,
            tecnicos:tecnicos
        })
    })
}

async function addTecnico(req,res){
    Tecnico.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido
     }).then(tecnico =>{
         req.flash('success_msg', 'Se ha agregado un tecnico al listado');
         res.redirect('/tecnico') 
       
     })
}

async function borrarTecnico(req,res){
    let tecnicoId = req.params.id;
    try{
    Tecnico.destroy({
        where: {id:tecnicoId}
    }).then(()=>{
        req.flash('success_msg', 'Tecnico Eliminado'); 
        res.redirect('/tecnico');
    })
    }catch(err){
        console.log(err);
    }
    
    
}

module.exports = {
    getTecnico,
    addTecnico,
    borrarTecnico
}