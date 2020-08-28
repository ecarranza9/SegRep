const express = require('express');
const router = express.Router();
const {Pedido,Tecnico,Pedidotecnico,Cierre} = require('../sequelize');
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart({uploadDir:'./src/uploads'});
const fs = require('fs');
const path = require('path');


async function cierreUploadFile(req,res){

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

}

async function cierreDownReporte(req,res){
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
}

async function getCierre(req,res){
    const user = req.user
    const pedidos = await Pedido.findAll({where:{estado:2}});
    const cierres = await Cierre.findAll({order:[['pedidoId','ASC']]});
    res.render('cierres',{
        pedidos:pedidos,
        user:user,
        cierres:cierres
    })
}

async function detalleCierre(req,res){
    let pedidoId = req.params.id;
    const user = req.user;
    const pedido = await Pedido.findAll({where:{id:pedidoId}})
    const cierres = await Cierre.findAll({where:{pedidoId:pedidoId}})
    const pedidoAsignado = await Pedidotecnico.findAll({where:{pedidoId:pedidoId}})
    const tecnicos = await Tecnico.findAll()
    res.render('detalleCierre', {
        user:user,
        cierres: cierres,
        pedidoAsignado:pedidoAsignado,
        tecnicos:tecnicos,
        pedido:pedido
    })
}

module.exports = {
    cierreUploadFile,
    cierreDownReporte,
    getCierre,
    detalleCierre
}