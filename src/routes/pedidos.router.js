const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedido.controller');



router.get('/', pedidoController.getPedidos)
router.get('/nuevo', (req,res)=>{
    res.render('addPedido')
})
router.post('/nuevo', pedidoController.addPedido)
router.get('/:id', pedidoController.borrarPedido)
router.get('/edit/:id', pedidoController.getEditarPedido)
router.post('/edit/:id', pedidoController.editarPedido)
router.get('/asignar/:id', pedidoController.getasignarPedido)
router.post('/asignar/:id', pedidoController.asignarPedido)
router.get('/cierre/:id', pedidoController.getcerrarPedido)
router.post('/cierre/:id', pedidoController.cerrarPedido)











module.exports = router;