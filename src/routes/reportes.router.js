const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporte.controller')


router.get('/', reporteController.getAllPedidos)




module.exports = router