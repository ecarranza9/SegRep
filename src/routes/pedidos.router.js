const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedido.controller');
const { isAuthenticated }  = require('../helpers/auth');



router.get('/', isAuthenticated, pedidoController.getPedidos)
router.get('/nuevo', isAuthenticated, (req,res)=>{
    const user = req.user
    res.render('addPedido',{user})
})
router.post('/nuevo', isAuthenticated, pedidoController.addPedido)
router.get('/:id', isAuthenticated, pedidoController.borrarPedido)
router.get('/edit/:id', isAuthenticated, pedidoController.getEditarPedido)
router.post('/edit/:id', isAuthenticated, pedidoController.editarPedido)
router.get('/asignar/:id', isAuthenticated, pedidoController.getasignarPedido)
router.post('/asignar/:id',isAuthenticated, pedidoController.asignarPedido)
router.get('/cierre/:id',isAuthenticated, pedidoController.getcerrarPedido)
router.post('/cierre/:id',isAuthenticated, pedidoController.cerrarPedido)












module.exports = router;